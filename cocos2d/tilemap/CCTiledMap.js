/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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

require('./CCTMXXMLParser');
require('./CCTiledMapAsset');
require('./CCTiledLayer');
require('./CCTiledTile');
require('./CCTiledObjectGroup');

/**
 * !#en The orientation of tiled map.
 * !#zh Tiled Map 地图方向。
 * @enum TiledMap.Orientation
 * @static
 */
let Orientation = cc.Enum({
    /**
     * !#en Orthogonal orientation.
     * !#zh 直角鸟瞰地图（90°地图）。
     * @property ORTHO
     * @type {Number}
     * @static
     */
    ORTHO: 0,

    /**
     * !#en Hexagonal orientation.
     * !#zh 六边形地图
     * @property HEX
     * @type {Number}
     * @static
     */
    HEX: 1,

    /**
     * Isometric orientation.
     * 等距斜视地图（斜45°地图）。
     * @property ISO
     * @type {Number}
     * @static
     */
    ISO: 2
});

/*
 * The property type of tiled map.
 * @enum TiledMap.Property
 * @static
 */
let Property = cc.Enum({
    /**
     * @property NONE
     * @type {Number}
     * @static
     */
    NONE: 0,

    /**
     * @property MAP
     * @type {Number}
     * @static
     */
    MAP: 1,

    /**
     * @property LAYER
     * @type {Number}
     * @static
     */
    LAYER: 2,

    /**
     * @property OBJECTGROUP
     * @type {Number}
     * @static
     */
    OBJECTGROUP: 3,

    /**
     * @property OBJECT
     * @type {Number}
     * @static
     */
    OBJECT: 4,

    /**
     * @property TILE
     * @type {Number}
     * @static
     */
    TILE: 5
});

/*
 * The tile flags of tiled map.
 * @enum TiledMap.TileFlag
 * @static
 */
let TileFlag = cc.Enum({
    /**
     * @property HORIZONTAL
     * @type {Number}
     * @static
     */
    HORIZONTAL: 0x80000000,

    /**
     * @property VERTICAL
     * @type {Number}
     * @static
     */
    VERTICAL: 0x40000000,

    /**
     * @property DIAGONAL
     * @type {Number}
     * @static
     */
    DIAGONAL: 0x20000000,

    /**
     * @property FLIPPED_ALL
     * @type {Number}
     * @static
     */
    FLIPPED_ALL: (0x80000000 | 0x40000000 | 0x20000000) >>> 0,

    /**
     * @property FLIPPED_MASK
     * @type {Number}
     * @static
     */
    FLIPPED_MASK: (~(0x80000000 | 0x40000000 | 0x20000000)) >>> 0
});

/*
 * !#en The stagger axis of Hex tiled map.
 * !#zh 六边形地图的 stagger axis 值
 * @enum TiledMap.StaggerAxis
 * @static
 */
let StaggerAxis = cc.Enum({
    /**
     * @property STAGGERAXIS_X
     * @type {Number}
     * @static
     */
    STAGGERAXIS_X : 0,

    /**
     * @property STAGGERAXIS_Y
     * @type {Number}
     * @static
     */
    STAGGERAXIS_Y : 1
});

/*
 * !#en The stagger index of Hex tiled map.
 * !#zh 六边形地图的 stagger index 值
 * @enum TiledMap.StaggerIndex
 * @static
 */
let StaggerIndex = cc.Enum({
    /**
     * @property STAGGERINDEX_ODD
     * @type {Number}
     * @static
     */
    STAGGERINDEX_ODD : 0,

    /**
     * @property STAGGERINDEX_EVEN
     * @type {Number}
     * @static
     */
    STAGGERINDEX_EVEN : 1
});

let TMXObjectType = cc.Enum({
    RECT : 0,
    ELLIPSE : 1,
    POLYGON : 2,
    POLYLINE : 3,
    IMAGE : 4,
    TEXT: 5,
});

/**
 * !#en Renders a TMX Tile Map in the scene.
 * !#zh 在场景中渲染一个 tmx 格式的 Tile Map。
 * @class TiledMap
 * @extends Component
 */
let TiledMap = cc.Class({
    name: 'cc.TiledMap',
    extends: cc.Component,

    editor: CC_EDITOR && {
        executeInEditMode: true,
        menu: 'i18n:MAIN_MENU.component.renderers/TiledMap',
    },

    ctor () {
        // store all layer gid corresponding texture info, index is gid, format likes '[gid0]=tex-info,[gid1]=tex-info, ...'
        this._texGrids = [];
        // store all tileset texture, index is tileset index, format likes '[0]=texture0, [1]=texture1, ...'
        this._textures = [];
        this._tilesets = [];

        this._animations = [];
        this._imageLayers = [];
        this._layers = [];
        this._groups = [];
        this._properties = [];
        this._tileProperties = [];
        
        this._mapSize = cc.size(0, 0);
        this._tileSize = cc.size(0, 0);
    },

    statics: {
        Orientation: Orientation,
        Property: Property,
        TileFlag: TileFlag,
        StaggerAxis: StaggerAxis,
        StaggerIndex: StaggerIndex,
        TMXObjectType: TMXObjectType
    },

    properties: {
        _tmxFile: {
            default: null,
            type: cc.TiledMapAsset
        },
        /**
         * !#en The TiledMap Asset.
         * !#zh TiledMap 资源。
         * @property {TiledMapAsset} tmxAsset
         * @default ""
         */
        tmxAsset : {
            get () {
                return this._tmxFile;
            },
            set (value, force) {
                if (this._tmxFile !== value || (CC_EDITOR && force)) {
                    this._tmxFile = value;
                    this._applyFile();
                }
            },
            type: cc.TiledMapAsset
        }
    },

    /**
     * !#en Gets the map size.
     * !#zh 获取地图大小。
     * @method getMapSize
     * @return {Size}
     * @example
     * let mapSize = tiledMap.getMapSize();
     * cc.log("Map Size: " + mapSize);
     */
    getMapSize () {
        return this._mapSize;
    },

    /**
     * !#en Gets the tile size.
     * !#zh 获取地图背景中 tile 元素的大小。
     * @method getTileSize
     * @return {Size}
     * @example
     * let tileSize = tiledMap.getTileSize();
     * cc.log("Tile Size: " + tileSize);
     */
    getTileSize () {
        return this._tileSize;
    },

    /**
     * !#en map orientation.
     * !#zh 获取地图方向。
     * @method getMapOrientation
     * @return {Number}
     * @example
     * let mapOrientation = tiledMap.getMapOrientation();
     * cc.log("Map Orientation: " + mapOrientation);
     */
    getMapOrientation () {
        return this._mapOrientation;
    },

    /**
     * !#en object groups.
     * !#zh 获取所有的对象层。
     * @method getObjectGroups
     * @return {TiledObjectGroup[]}
     * @example
     * let objGroups = titledMap.getObjectGroups();
     * for (let i = 0; i < objGroups.length; ++i) {
     *     cc.log("obj: " + objGroups[i]);
     * }
     */
    getObjectGroups () {
        return this._groups;
    },

    /**
     * !#en Return the TMXObjectGroup for the specific group.
     * !#zh 获取指定的 TMXObjectGroup。
     * @method getObjectGroup
     * @param {String} groupName
     * @return {TiledObjectGroup}
     * @example
     * let group = titledMap.getObjectGroup("Players");
     * cc.log("ObjectGroup: " + group);
     */
    getObjectGroup (groupName) {
        let groups = this._groups;
        for (let i = 0, l = groups.length; i < l; i++) {
            let group = groups[i];
            if (group && group.getGroupName() === groupName) {
                return group;
            }
        }

        return null;
    },

    /**
     * !#en Gets the map properties.
     * !#zh 获取地图的属性。
     * @method getProperties
     * @return {Object[]}
     * @example
     * let properties = titledMap.getProperties();
     * for (let i = 0; i < properties.length; ++i) {
     *     cc.log("Properties: " + properties[i]);
     * }
     */
    getProperties () {
        return this._properties;
    },

    /**
     * !#en Return All layers array.
     * !#zh 返回包含所有 layer 的数组。
     * @method getLayers
     * @returns {TiledLayer[]}
     * @example
     * let layers = titledMap.allLayers();
     * for (let i = 0; i < layers.length; ++i) {
     *     cc.log("Layers: " + layers[i]);
     * }
     */
    getLayers () {
        return this._layers;
    },

    /**
     * !#en return the cc.TiledLayer for the specific layer.
     * !#zh 获取指定名称的 layer。
     * @method getLayer
     * @param {String} layerName
     * @return {TiledLayer}
     * @example
     * let layer = titledMap.getLayer("Player");
     * cc.log(layer);
     */
    getLayer (layerName) {
        let layers = this._layers;
        for (let i = 0, l = layers.length; i < l; i++) {
            let layer = layers[i];
            if (layer && layer.getLayerName() === layerName) {
                return layer;
            }
        }
        return null;
    },

    _changeLayer (layerName, replaceLayer) {
        let layers = this._layers;
        for (let i = 0, l = layers.length; i < l; i++) {
            let layer = layers[i];
            if (layer && layer.getLayerName() === layerName) {
                layers[i] = replaceLayer;
                return;
            }
        }
    },

    /**
     * !#en Return the value for the specific property name.
     * !#zh 通过属性名称，获取指定的属性。
     * @method getProperty
     * @param {String} propertyName
     * @return {String}
     * @example
     * let property = titledMap.getProperty("info");
     * cc.log("Property: " + property);
     */
    getProperty (propertyName) {
        return this._properties[propertyName.toString()];
    },

    /**
     * !#en Return properties dictionary for tile GID.
     * !#zh 通过 GID ，获取指定的属性。
     * @method getPropertiesForGID
     * @param {Number} GID
     * @return {Object}
     * @example
     * let properties = titledMap.getPropertiesForGID(GID);
     * cc.log("Properties: " + properties);
     */
    getPropertiesForGID (GID) {
        return this._tileProperties[GID];
    },

    __preload () {
        if (this._tmxFile) {
            // refresh layer entities
            this._applyFile();
        }
    },

    onEnable () {
        this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._adjustLayerPos, this);
    },

    onDisable () {
        this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._adjustLayerPos, this);
    },

    _applyFile () {
        let file = this._tmxFile;
        if (file) {
            let texValues = file.textures;
            let texKeys = file.textureNames;
            let textures = {};
            for (let i = 0; i < texValues.length; ++i) {
                textures[texKeys[i]] = texValues[i];
            }

            let imageLayerTextures = {};
            texValues = file.imageLayerTextures;
            texKeys = file.imageLayerTextureNames;
            for (let i = 0; i < texValues.length; ++i) {
                imageLayerTextures[texKeys[i]] = texValues[i];
            }

            let tsxFileNames = file.tsxFileNames;
            let tsxFiles = file.tsxFiles;
            let tsxMap = {};
            for (let i = 0; i < tsxFileNames.length; ++i) {
                if (tsxFileNames[i].length > 0) {
                    tsxMap[tsxFileNames[i]] = tsxFiles[i].text;
                }
            }

            let mapInfo = new cc.TMXMapInfo(file.tmxXmlStr, tsxMap, textures, imageLayerTextures);
            let tilesets = mapInfo.getTilesets();
            if(!tilesets || tilesets.length === 0)
                cc.logID(7241);

            this._buildWithMapInfo(mapInfo);
        }
        else {
            this._releaseMapInfo();
        }
    },

    _releaseMapInfo () {
        // remove the layers & object groups added before
        let layers = this._layers;
        for (let i = 0, l = layers.length; i < l; i++) {
            layers[i].node.destroy();
        }
        layers.length = 0;

        let groups = this._groups;
        for (let i = 0, l = groups.length; i < l; i++) {
            groups[i].node.destroy();
        }
        groups.length = 0;
    },

    _adjustLayerPos () {
        let anchor = this.node.getAnchorPoint();
        let nx = this.node.width * (0.5 - anchor.x);
        let ny = this.node.height * (0.5 - anchor.y);
        for (let i = 0, l = this._layers.length; i < l; i++) {
            let layerNode = this._layers[i].node;
            if (layerNode) {
                layerNode._adjustLayerPos(nx, ny);
            }
        }
    },

    _buildLayerAndGroup () {
        let tilesets = this._tilesets;
        let texGrids = this._texGrids;
        let animations = this._animations;
        texGrids.length = 0;
        for (let i = 0, l = tilesets.length; i < l; ++i) {
            let tilesetInfo = tilesets[i];
            if (!tilesetInfo) continue;
            cc.TiledMap.fillTextureGrids(tilesetInfo, texGrids, i);
            cc.TiledMap.fillAniGrids(texGrids, animations);
        }

        let mapInfo = this._mapInfo;
        let layers = this._layers;
        let groups = this._groups;
        let node = this.node;
        let layerInfos = mapInfo.getAllChildren();
        let textures = this._textures;
        let maxWidth = 0, maxHeight = 0;
        if (layerInfos && layerInfos.length > 0) {
            for (let i = 0, len = layerInfos.length; i < len; i++) {
                let layerInfo = layerInfos[i];
                let name = layerInfo.name;

                let child = this.node.getChildByName(name);
                if (!child) {
                    child = new cc.Node();
                    child.name = name;
                    node.addChild(child);
                }

                if (!layerInfo.visible) continue;

                if (layerInfo instanceof cc.TMXLayerInfo) {
                    let layer = child.getComponent(cc.TiledLayer);
                    if (!layer) {
                        layer = child.addComponent(cc.TiledLayer);
                    }
                    
                    layer._init(layerInfo, mapInfo, tilesets, textures, texGrids);

                    // tell the layerinfo to release the ownership of the tiles map.
                    layerInfo.ownTiles = false;

                    // update content size with the max size
                    if (maxWidth < child.width) maxWidth = child.width;
                    if (maxHeight < child.height) maxHeight = child.height;

                    layers.push(layer);
                }
                else if (layerInfo instanceof cc.TMXObjectGroupInfo) {
                    let group = child.getComponent(cc.TiledObjectGroup);
                    if (!group) {
                        group = child.addComponent(cc.TiledObjectGroup);
                    }
                    group._init(layerInfo, mapInfo, texGrids);
                    groups.push(group);
                }
                else if (layerInfo instanceof cc.TMXImageLayerInfo) {
                    let offset = cc.TiledMap.calculateLayerOffset(layerInfo.offset, mapInfo);
                    let texture = layerInfo.sourceImage;
                    child.x = offset.x;
                    child.y = offset.y;
                    child.opacity = layerInfo.opacity;
                    child.width = texture.width;
                    child.height = texture.height;

                    let image = child.getComponent(cc.Sprite);
                    if (!image) {
                        image = child.addComponent(cc.Sprite);
                    }
                    image.spriteFrame = new cc.SpriteFrame(texture);
                }
            }
        }

        this.node.width = maxWidth;
        this.node.height = maxHeight;
        this._syncAnchorPoint();
    },

    _buildWithMapInfo (mapInfo) {
        this._releaseMapInfo();

        this._mapInfo = mapInfo;
        this._mapSize = mapInfo.getMapSize();
        this._tileSize = mapInfo.getTileSize();
        this._mapOrientation = mapInfo.orientation;
        this._properties = mapInfo.properties;
        this._tileProperties = mapInfo.getTileProperties();
        this._imageLayers = mapInfo.getImageLayers();
        this._animations = mapInfo.getTileAnimations();

        let tilesets = this._tilesets;
        this._textures.length = 0;

        let totalTextures = [];
        for (let i = 0, l = tilesets.length; i < l; ++i) {
            let tilesetInfo = tilesets[i];
            if (!tilesetInfo || !tilesetInfo.sourceImage) continue;
            this._textures[i] = tilesetInfo.sourceImage;
            totalTextures.push(tilesetInfo.sourceImage);
        }

        for (let i = 0; i < this._imageLayers.length; i++) {
            let imageLayer = this._imageLayers[i];
            if (!imageLayer || !imageLayer.sourceImage) continue;
            totalTextures.push(imageLayer.sourceImage);
        }

        cc.TiledMap.loadAllTextures (totalTextures, function () {
            this._buildLayerAndGroup();
        }.bind(this));
    },

    update (dt) {
        let animations = this._animations;
        let texGrids = this._texGrids;
        for (let aniGID in animations) {
            let animation = animations[aniGID];
            let frames = animation.frames;
            let frame = frames[animation.frameIdx];
            animation.dt += dt;
            if (frame.duration < animation.dt) {
                animation.dt = 0;
                animation.frameIdx++;
                if (animation.frameIdx >= frames.length) {
                    animation.frameIdx = 0;
                }
                frame = frames[animation.frameIdx];
            }
            texGrids[frame.tileid] = frame.grid;
        }
    },
});

cc.TiledMap = module.exports = TiledMap;

cc.TiledMap.calculateLayerOffset = function (pos, mapInfo) {
    let ret = cc.v2(0,0);
    let layerOrientation = mapInfo.orientation;
    let mapTileSize = mapInfo.getTileSize();
    let staggerAxis = mapInfo.getStaggerAxis();
    let staggerIndex = mapInfo.getStaggerIndex();
    let hexSideLength = mapInfo.getHexSideLength();

    switch (layerOrientation) {
        case cc.TiledMap.Orientation.ORTHO:
            ret = cc.v2(pos.x * mapTileSize.width, -pos.y * mapTileSize.height);
            break;
        case cc.TiledMap.Orientation.ISO:
            ret = cc.v2((mapTileSize.width / 2) * (pos.x - pos.y),
                (mapTileSize.height / 2 ) * (-pos.x - pos.y));
            break;
        case cc.TiledMap.Orientation.HEX:
            if(staggerAxis === cc.TiledMap.StaggerAxis.STAGGERAXIS_Y)
            {
                let diffX = (staggerIndex === cc.TiledMap.StaggerIndex.STAGGERINDEX_EVEN) ? mapTileSize.width/2 : 0;
                ret = cc.v2(pos.x * mapTileSize.width + diffX,
                           -pos.y * (mapTileSize.height - (mapTileSize.width - hexSideLength) / 2));
            }
            else if(staggerAxis === cc.TiledMap.StaggerAxis.STAGGERAXIS_X)
            {
                let diffY = (staggerIndex === cc.TiledMap.StaggerIndex.STAGGERINDEX_ODD) ? mapTileSize.height/2 : 0;
                ret = cc.v2(pos.x * (mapTileSize.width - (mapTileSize.width - hexSideLength) / 2),
                           -pos.y * mapTileSize.height + diffY);
            }
            break;
    }
    return ret;
};

cc.TiledMap.loadAllTextures = function (textures, loadedCallback) {
    let totalNum = textures.length;
    if (totalNum === 0) {
        loadedCallback();
        return;
    }

    let curNum = 0;
    let itemCallback = function () {
        curNum ++;
        if (curNum >= totalNum) {
            loadedCallback();
        }
    };

    for (let i = 0; i < totalNum; i++) {
        let tex = textures[i];
        if (!tex.loaded) {
            tex.once('load', function () {
                itemCallback();
            });
        } else {
            itemCallback();
        }
    }
};

cc.TiledMap.fillAniGrids = function (texGrids, animations) {
    for (let i = 0; i < animations.length; i++) {
        let animation = animations[i];
        if (!animation) continue;
        let frames = animation.frames;
        for (let j = 0; j < frames.length; j++) {
            let frame = frames[j];
            frame.grid = texGrids[frame.tileid];
        }
    }
};

cc.TiledMap.fillTextureGrids = function (tileset, texGrids, texId) {
    let tex = tileset.sourceImage;

    if (!tileset.imageSize.width || !tileset.imageSize.height) {
        tileset.imageSize.width = tex.width;
        tileset.imageSize.height = tex.height;
    }

    let tw = tileset._tileSize.width,
        th = tileset._tileSize.height,
        imageW = tex.width,
        imageH = tex.height,
        spacing = tileset.spacing,
        margin = tileset.margin,

        cols = Math.floor((imageW - margin*2 + spacing) / (tw + spacing)),
        rows = Math.floor((imageH - margin*2 + spacing) / (th + spacing)),
        count = rows * cols,

        gid = tileset.firstGid,
        maxGid = tileset.firstGid + count,
        grid = null,
        override = texGrids[gid] ? true : false,
        texelCorrect = cc.macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX ? 0.5 : 0;

    for (; gid < maxGid; ++gid) {
        // Avoid overlapping
        if (override && !texGrids[gid]) {
            override = false;
        }
        if (!override && texGrids[gid]) {
            break;
        }

        grid = {
            // record texture id
            texId: texId, 
            // record belong to which tileset
            tileset: tileset,
            spriteFrame: null,
            x: 0, y: 0, width: tw, height: th,
            t: 0, l: 0, r: 0, b: 0,
            gid: gid,
        };
        tileset.rectForGID(gid, grid);
        grid.x += texelCorrect;
        grid.y += texelCorrect;
        grid.width -= texelCorrect*2;
        grid.height -= texelCorrect*2;
        grid.t = (grid.y) / imageH;
        grid.l = (grid.x) / imageW;
        grid.r = (grid.x + grid.width) / imageW;
        grid.b = (grid.y + grid.height) / imageH;
        texGrids[gid] = grid;
    }
};

cc.TiledMap.flipTexture = function (outGrid, inGrid, gid) {
    outGrid.r = inGrid.r;
    outGrid.l = inGrid.l;
    outGrid.b = inGrid.b;
    outGrid.t = inGrid.t;

    let tempVal = 0;
    // diagonal
    if ((gid & TileFlag.DIAGONAL) >>> 0) {
        tempVal = inGrid.r;
        outGrid.r = inGrid.b;
        outGrid.b = tempVal;
    }

    // flip x
    if ((gid & TileFlag.HORIZONTAL) >>> 0) {
        tempVal = inGrid.r;
        outGrid.r = inGrid.l;
        outGrid.l = tempVal;
    }

    // flip y
    if ((gid & TileFlag.HORIZONTAL) >>> 0) {
        tempVal = inGrid.b;
        outGrid.b = inGrid.t;
        outGrid.t = tempVal;
    }
};

cc.js.obsolete(cc.TiledMap.prototype, 'cc.TiledMap.tmxFile', 'tmxAsset', true);
cc.js.get(cc.TiledMap.prototype, 'mapLoaded', function () {
    cc.errorID(7203);
    return [];
}, false);
