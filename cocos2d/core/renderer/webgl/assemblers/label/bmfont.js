/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

const js = require('../../../../platform/js');
const bmfontUtls = require('../../../utils/label/bmfont');

module.exports = js.addon({
    createData (comp) {
        return comp.requestRenderData();
    },

    fillBuffers (comp, renderer) {
        let node = comp.node,
            renderData = comp._renderData,
            verts = renderData.vertices,
            color = node._color._val;
        
        let matrixm = node._worldMatrix.m,
            a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5], 
            tx = matrixm[12], ty = matrixm[13];
    
        let buffer = renderer._quadBuffer,
            vertexOffset = buffer.byteOffset >> 2;
        
        let vertexCount = renderData.vertexCount;
        buffer.request(vertexCount, renderData.indiceCount);

        // buffer data may be realloc, need get reference after request.
        let vbuf = buffer._vData,
            uintbuf = buffer._uintVData;

        for (let i = 0; i < vertexCount; i++) {
            let vert = verts[i];
            vbuf[vertexOffset++] = vert.x * a + vert.y * c + tx;
            vbuf[vertexOffset++] = vert.x * b + vert.y * d + ty;
            vbuf[vertexOffset++] = vert.u;
            vbuf[vertexOffset++] = vert.v;
            uintbuf[vertexOffset++] = color;
        }
    },

    appendQuad (comp, texture, rect, rotated, x, y, scale) {
        let renderData = comp._renderData;
        let dataOffset = renderData.dataLength;
        
        renderData.dataLength += 4;
        renderData.vertexCount = renderData.dataLength;
        renderData.indiceCount = renderData.dataLength / 2 * 3;

        let verts = renderData.vertices;
        let texw = texture.width,
            texh = texture.height;

        let rectWidth = rect.width,
            rectHeight = rect.height;

        let l, b, r, t;
        if (!rotated) {
            l = (rect.x) / texw;
            r = (rect.x + rectWidth) / texw;
            b = (rect.y + rectHeight) / texh;
            t = (rect.y) / texh;

            verts[dataOffset].u = l;
            verts[dataOffset].v = b;
            verts[dataOffset+1].u = r;
            verts[dataOffset+1].v = b;
            verts[dataOffset+2].u = l;
            verts[dataOffset+2].v = t;
            verts[dataOffset+3].u = r;
            verts[dataOffset+3].v = t;
        } else {
            l = (rect.x) / texw;
            r = (rect.x + rectHeight) / texw;
            b = (rect.y + rectWidth) / texh;
            t = (rect.y) / texh;

            verts[dataOffset].u = l;
            verts[dataOffset].v = t;
            verts[dataOffset+1].u = l;
            verts[dataOffset+1].v = b;
            verts[dataOffset+2].u = r;
            verts[dataOffset+2].v = t;
            verts[dataOffset+3].u = r;
            verts[dataOffset+3].v = b;
        }

        verts[dataOffset].x = x;
        verts[dataOffset].y = y - rectHeight * scale;
        verts[dataOffset+1].x = x + rectWidth * scale;
        verts[dataOffset+1].y = y - rectHeight * scale;
        verts[dataOffset+2].x = x;
        verts[dataOffset+2].y = y;
        verts[dataOffset+3].x = x + rectWidth * scale;
        verts[dataOffset+3].y = y;
    },
}, bmfontUtls);
