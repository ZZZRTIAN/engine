/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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

const ttfUtils = require('../../../utils/label/ttf')
const js = require('../../../../platform/js');
const utils = require('../utils');

module.exports = js.addon({
    createData (sprite) {
        let renderData = sprite.requestRenderData();
        // 0 for bottom left, 1 for top right
        renderData.dataLength = 2;
        return renderData;
    },

    _updateVerts (comp) {
        let renderData = comp._renderData;

        let node = comp.node,
            width = node.width,
            height = node.height,
            appx = node.anchorX * width,
            appy = node.anchorY * height;

        let verts = renderData.vertices;
        verts[0].x = -appx;
        verts[0].y = -appy;
        verts[1].x = width - appx;
        verts[1].y = height - appy;
    },

    _updateTexture (comp) {
        ttfUtils._updateTexture(comp);
        utils.dropColorizedImage(comp._texture, comp.node.color);
    },

    draw (ctx, comp) {
        let node = comp.node;
        // Transform
        let matrixm = node._worldMatrix.m;
        let a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5],
            tx = matrixm[12], ty = matrixm[13];
        ctx.transform(a, b, c, d, tx, ty);
        ctx.scale(1, -1);

        // TODO: handle blend function

        // opacity
        ctx.globalAlpha = node.opacity / 255;

        let tex = comp._texture,
            verts = comp._renderData.vertices;

        let image = tex.getHtmlElementObj();

        let x = verts[0].x;
        let y = verts[0].y;
        let w = verts[1].x - x;
        let h = verts[1].y - y;
        y = - y - h;

        ctx.drawImage(image, x, y, w, h);
        return 1;
    }
}, ttfUtils);
