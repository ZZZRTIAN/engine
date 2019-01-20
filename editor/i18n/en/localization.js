module.exports = {
    'COMPONENT': {
        "help_url": {
            "audiosource": "https://docs.cocos.com/creator/manual/en/components/audiosource.html",
            "animation": "https://docs.cocos.com/creator/manual/en/components/animation.html",
            "sprite": "https://docs.cocos.com/creator/manual/en/components/sprite.html",
            "label": "https://docs.cocos.com/creator/manual/en/components/label.html",
            "canvas": "https://docs.cocos.com/creator/manual/en/components/canvas.html",
            "spine": "https://docs.cocos.com/creator/manual/en/components/spine.html",
            "widget": "https://docs.cocos.com/creator/manual/en/components/widget.html",
            "button": "https://docs.cocos.com/creator/manual/en/components/button.html",
            "progressbar": "https://docs.cocos.com/creator/manual/en/components/progress.html",
            "mask": "https://docs.cocos.com/creator/manual/en/components/mask.html",
            "scrollview": "https://docs.cocos.com/creator/manual/en/components/scrollview.html",
            "scrollbar": "https://docs.cocos.com/creator/manual/en/components/scrollbar.html",
            "layout": "https://docs.cocos.com/creator/manual/en/components/layout.html",
            "tiledmap": "https://docs.cocos.com/creator/manual/en/components/tiledmap.html",
            "editbox": "https://docs.cocos.com/creator/manual/en/components/editbox.html",
            "videoplayer": "https://docs.cocos.com/creator/manual/en/components/videoplayer.html",
            "motionStreak": "https://docs.cocos.com/creator/manual/en/components/motion-streak.html",
            "richtext": "https://docs.cocos.com/creator/manual/en/components/richtext.html",
            "pageview": "https://docs.cocos.com/creator/manual/en/components/pageview.html",
            "pageviewIndicator": "https://docs.cocos.com/creator/manual/en/components/pageviewindicator.html",
            "toggle": "https://docs.cocos.com/creator/manual/en/components/toggle.html",
            "toggleGroup": "https://docs.cocos.com/creator/manual/en/components/toggleGroup.html",
            "toggleContainer": "https://docs.cocos.com/creator/manual/en/components/toggleContainer.html",
            "slider": "https://docs.cocos.com/creator/manual/en/components/slider.html",
            "block_input_events": "https://docs.cocos.com/creator/manual/en/components/block-input-events.html",
            "wx_subcontext_view": "https://docs.cocos.com/creator/manual/en/publish/publish-wechatgame-sub-domain.html"
        },
        "animation": {
            "default_clip": "When checking, the deault animation clip is automatically played.",
            "clips": "You can access and play animation clips via a script",
            "play_on_load": "Automatically play animation clip with the scene is loaded"
        },
        "audio": {
            "clip": "About to be played.",
            "volume": "How loud to play an audio clip",
            "mute": "Mute. Audio may continue to play, however ther will be no sound.",
            "loop": "Loop audio clip? (repeat it over and over)",
            "play_on_load": "Automatically play audio clip with the game is running?"
        },
        "sprite": {
            "sprite_frame": "SpriteFrame image to use",
            "atlas": "Atlas that the image belongs to",
            "type": "Rendering Mode: Simple, Sliced, Tiled or Filled",
            "original_size": "Use the Images original size as the Node size?",
            "edit_button": "Edit",
            "select_button": "Select In Atlas",
            "select_tooltip": "Choose Atlas",
            "edit_tooltip": "Open Sprite Editor, set squares and other data",
            'fill_type': 'The direction of filling, choose from Horizontal, Vertical and Radial',
            'fill_center': 'For radial filling, set the center of the circle, value range is 0 to 1',
            'fill_start': 'The normalized value indicate where to start filling',
            'fill_range': 'The normalizad value indicate how much of the sprite we want to show',
            'src_blend_factor': 'The source image blend mode',
            'dst_blend_factor': 'The destination image blend mode',
            'size_mode': 'Set the size of the node which Sprite component is on. CUSTOM for setting width and height manually;TRIMMED to use image size with transparent pixels trimmed; RAW to use image size without trimming.',
            'trim': 'Whether to render transparent pixels around image in node\'s bounding box. If you check this option the boudning box will not include transparent pixels around the image.'
        },
        "button": {
            "click_event": {
                "target": "Node receives a click event?",
                "component": "Component receives a click event?",
                "handler": "What method is called on the click event?",
                "customEventData": "The extra event data passed to the event handler, it's passed in as the last argument in the event handler. "
            },
            "interactable": "Interactive button? When this one is not selected, the button is in a disabled state",
            "transition": "Transition Type: when the state changes",
            "normal_color": "Button color",
            "pressed_color": "Button color when pressed",
            "hover_color": "Button color when the mouse hovers over it",
            "disabled_color": "Button color when disabled",
            "duration": "How long until the button color/scale transitions to a new color?",
            "zoom_scale": "When user press the button, the button will zoom to a scale.The final scale of the button  equals (button original scale * zoomScale). Setting zoomScale less than 1 is not adviced, which could fire the touchCancel event if the touch point is out of touch area after scaling.",
            "auto_gray_effect": "When this flag is true, Button target sprite will turn gray when interactable is false.",
            "normal_sprite": "The Sprite that is used when the button is in a normal sate.",
            "pressed_sprite": "The Sprite that is used when the button is in a pressed sate.",
            "hover_sprite": "The Sprite that is used when the button is hovered over.",
            "disabled_sprite": "The Sprite that is used when the button is in a disabled sate.",
            "target": "reference to the Sprite as button's background. When the state of the button changes the sprite's color or spriteFrame will be updated.",
            "click_events": "What method is called on the click event?"
        },
        "canvas": {
            "design_resolution": "The resolution of the assets used in the game, in pixels.",
            "fit_height": "Canvas allows designers to automatically scale the resolution  to the full height of devices screen",
            "fit_width": "Canvas allows designers to automatically scale the resolution  to the full width of devices screen"
        },
        "label": {
            "string": "Text of the Label",
            "horizontal_align": "Horizontal alignment",
            "vertical_align": "Vertical alignment",
            "font_size": "Font size, in points",
            "font_family": "Font family name",
            "line_height": "Line height, in points",
            "overflow": "Text layout modes: \n 1. CLAMP: text nodes outside the bounding box will be truncated \n 2. SHRINK: automatically shrink text box according to the constraint node \n 3. RESIZE: Automatically updates the Node based on heightof the text.",
            "wrap": "Wrap text?",
            "font": "What font to use",
            "system_font": "Whether to use the system default font",
            'batch_as_bitmap': 'Whether to set to static text for batch merging, select this will add text to the dynamic atlas for batch merging, but can not dynamically modify text content frequently'
        },
        "progress": {
            "bar_sprite": "A progress bar is displayed with the Sprite node that can dynamically change the size",
            "mode": "Horizontal or Vertical progress bar?",
            "total_length": "Length of progress bar. The maximum length of 100",
            "progress": "Current progress indicator, ranging from 0-1",
            "reverse": "Can the progress bar update negatively (i.e go backwards)"
        },
        "scrollbar": {
            "handle": "reference to the interactive bar sprite",
            "direction": "Scroll direction",
            "auto_hide": "Hide scroll bar when it is not scrolling?",
            "auto_hide_time": "How long to wait to hide the scroll bar when it is not scrolling?"
        },
        "scrollview": {
            "content": "A scrollable display of the Nodes content",
            "horizontal": "Horizontal scroll",
            "vertical": "Vertical scroll",
            "inertia": "Use intertia when scrolling? (or just let your finger do all the work?)",
            "brake": "When using interia scrolling what to do when the user stops touching? 0 never stop, 1 stop immediately",
            "elastic": "Use elastic scrolling?",
            "bounce_time": "When using elastic scrolling how long to rebound afterwards?",
            "horizontal_bar": "Horizontal scrollbar",
            "vertical_bar": "Vertical scrollbar",
            "bounceDuration": 'The elapse time of bouncing back. A value of 0 will bounce back immediately',
            "scrollEvents": 'Scrollview events callback',
            "cancelInnerEvents": 'If cancelInnerEvents is set to true, the scroll behavior will cancel touch events on inner content nodes'
        },
        'pageview': {
            "sizeMode": 'Specify the size type of each page in PageView',
            "direction": 'The page view direction',
            "scrollThreshold": 'The scroll threshold value, when drag exceeds this value, release the next page will automatically scroll, less than the restore',
            "pageTurningEventTiming": 'Change the AutoScroll stop epsilon value of PageView, change this value could adjust the PageView\'s event triggering timing.',
            "indicator": 'The Page View Indicator',
            "pageTurningSpeed": 'The time required to turn over a page. unit: second',
            "pageEvents": 'PageView events callback',
            "autoPageTurningThreshold": 'Auto page turning velocity threshold. When users swipe the PageView quickly, it will calculate a velocity based on the scroll distance and time, if the calculated velocity is larger than the threshold, then it will trigger page turning'
        },
        'pageview_indicator': {
            'spriteFrame': 'The spriteFrame for each element',
            'direction': 'The location direction of PageViewIndicator',
            'cell_size': 'The cellSize for each element',
            'spacing': 'The distance between each element'
        },
        'toggle': {
            "interactable": "Interactive Toggle? When this one is not selected, the Toggle is in a disabled state",
            "transition": "Transition Type: when the state changes",
            "normal_color": "Toggle color",
            "pressed_color": "Toggle color when pressed",
            "hover_color": "Toggle color when the mouse hovers over it",
            "disabled_color": "Toggle color when disabled",
            "duration": "How long until the Toggle color/scale transitions to a new color?",
            "zoom_scale": "When user press the Toggle, the Toggle will zoom to a scale.The final scale of the Toggle  equals (Toggle original scale * zoomScale), zoomScale could be negative value.",
            "auto_gray_effect": "When this flag is true, Toggle target sprite will turn gray when interactable is false.",
            "normal_sprite": "The Sprite that is used when the Toggle is in a normal sate.",
            "pressed_sprite": "The Sprite that is used when the Toggle is in a pressed sate.",
            "hover_sprite": "The Sprite that is used when the Toggle is hovered over.",
            "disabled_sprite": "The Sprite that is used when the Toggle is in a disabled sate.",
            "target": "reference to the Sprite as Toggle's background. When the state of the button changes the sprite's color or spriteFrame will be updated.",
            'isChecked': 'If this flag is true, the associated checkMark sprite component will be enabled, otherwise the checkMark will be disabled.',
            'checkMark': 'The Sprite component displayed when Toggle is checked.',
            'toggleGroup': 'The toggle group which the toggle belongs to. When it is null, the toggle is a CheckBox. Otherwise, the toggle is a RadioButton.'
        },
        'toggle_group': {
            'allowSwitchOff': "If this setting is true, a toggle could be switched off and on when pressed.If it is false, it will make sure there is always only one toggle could be switched on and the already switched on toggle can't be switched off."
        },
        'slider': {
            'handle': 'The "handle" part of the slider',
            'direction': 'The slider direction',
            'progress': 'The current progress of the slider. The valid value is between 0-1',
            'slideEvents': 'The slider events callback'
        },
        "widget": {
            "target": 'Specifies an alignment target that can only be one of the parent nodes of the current node. The default value is null, and when null, indicates the current parent',
            "align_top": "Top edge alignment of the parent Node",
            "align_bottom": "Bottom edge alignment of the parent Node",
            "align_left": "Left edge alignment of the parent Node",
            "align_right": "Right edge alignment of the parent Node",
            "align_h_center": "Align to the horizontal midpoint of the parent Node",
            "align_v_center": "Align to the vertical midpoint of the parent Node",
            "align_mode": "Specifies the alignment mode of the Widget, which determines when the widget should refresh at runtime.",
            "top": "Top edge postion in pixels. This can be a percentage and a positive or negative value",
            "bottom": "Bottom edge postion in pixels. This can be a percentage and a positive or negative value",
            "left": "Left edge postion in pixels. This can be a percentage and a positive or negative value",
            "right": "Right edge postion in pixels. This can be a percentage and a positive or negative value",
            'horizontal_center': 'Horizontal midpoint offset in pixels, This can be a percentage and a positive or negative value',
            'vertical_center': 'Vertical midpoint offset in pixels, This can be a percentage and a positive or negative value'
        },
        "layout": {
            "layout_type": "Automatic layout mode: \n 1. NONE, no automatic arrangement of child Nodes \n 2. HORIZONTAL, automatic horizontal arrangement of child Nodes \n 3. VERTICAL, automatic vertical arrangement of child Nodes\n 4. GRID, automatic grid arrangement of child Nodes",
            "resize_mode": "Automatic resize mode: \n 1. NONE, no resize of both child Nodes and container. \n 2. CONTAINER, resize container Node. \n 3. CHILDREN, resize child Nodes.",
            'padding_left': 'Use a padding between left sides of the Node',
            'padding_right': 'Use a padding between right sides of the Node',
            'padding_top': 'Use a padding between top sides of the Node',
            'padding_bottom': 'Use a padding between bottom sides of the Node',
            "space_x": "The horizontal distance between adjacent child Nodes",
            "space_y": "The vertical distance between adjacent child Nodes",
            "vertical_direction": "Vertically align in the direction of the child Nodes: \n 1. TOP_TO_BOTTOM, \n 2. BOTTOM_TO_TOP",
            "horizontal_direction": "Horizontally align in the direction of the child Nodes: \n 1. LEFT_TO_RIGHT \n 2. RIGHT_TO_LEFT",
            "cell_size": "In Grid layout, the size of each child element.",
            "start_axis": "In Grid layout, the arrangement direction of children elements.",
            "affected_by_scale": "Whether the scaling of the child node affects the layout."
        },
        "particle": {
            "export_title": "Export custom particle data to plist file.",
            "export": "Export",
            "export_error": "This resource does not support exports outside of the project",
            "sync": "Sync",
            'sync_tips': "Synchronize the parameters in the File to Custom"
        },
        "editbox": {
            "string": "The initial input text of EditBox.",
            "backgroundImage": "The background image of EditBox.",
            "returnType": "The keyboard return type of EditBox. This is useful for keyboard of mobile device.",
            "input_flag": "Specify the input flag: password or capitalize word. ",
            "input_mode": "Specify the input mode: multiline or single line.",
            "font_size": "The font size of input label.",
            "line_height": "The line height of input label.",
            "stay_on_top": "Set to true and the input is always visible and be on top of the game view",
            "tab_index": "Set the tabIndex of the DOM input element, only useful on Web.",
            "font_color": "The font color of input label.",
            "placeholder": "The content string of placeholder.",
            "placeholder_font_size": "The font size of placeholder label.",
            "placeholder_font_color": "The font color of placeholder label.",
            "max_length": "The maximize input characters."
        },
        "videoplayer": {
            "resourceType": "The resource type of VideoPlayer, currently support remote URL and local videos.",
            "url": "The remote URL of video.",
            "video": "The local video full path.",
            "volume": "The volume of the video.(0.0 ~ 1.0)",
            "mute": "Mutes the VideoPlayer. Mute sets the volume=0, Un-Mute restore the original volume.",
            "currentTime": "The start time when video start to play.",
            "keepAspectRatio": "Whether keep the original video's aspect ratio.",
            "isFullscreen": "Whether keep the video fullscreen when it is playing.",
        },
        "webview": {
            "url": "A given URL to be loaded by the WebView, it should have a http or https prefix."
        },
        "richtext": {
            "string": "Text of the RichText, you could use BBcode in the string",
            "horizontal_align": "Horizontal alignment",
            "font_size": "Font size, in points",
            "font": "Custom TTF font of RichText",
            "font_family": "Custom System font of RichText",
            "system_font": "Whether to use the system default font",
            "line_height": "Line height, in points",
            "max_width": "The maximize width of RichText, pass 0 means not limit the maximize width.",
            "image_atlas": "The image atlas for the img tag. For each src value in the img tag, there should be a valid spriteFrame in the image atlas.",
            "handleTouchEvent": "Once checked, the RichText will block all input events (mouse and touch) within the bounding box of the node, preventing the input from penetrating into the underlying node."
        },
        "skeleton": {
            "skeleton_data": "The skeleton data contains the skeleton information, drag the json file exported from Spine to get started.",
            "default_skin": "Choose the default skin.",
            "animation": "The name of current playing animation.",
            "loop": "Whether loop current animation",
            "time_scale": "The time scale of animations of this skeleton",
            "debug_slots": "Indicates whether show debug slots.",
            "debug_bones": "Indicates whether show debug bones.",
            "premultipliedAlpha": "Indicates whether to enable premultiplied alpha.",
            "use_tint": "Indicates whether to use tint effect."
        },
        "dragon_bones": {
            "dragon_bones_asset": "The json data contains the DragonBones information, drag the json file exported from DragonBones to get started.",
            "dragon_bones_atlas_asset": "The json data contains the Texture information, drag the json file exported from DragonBones to get started.",
            "armature_name": "The name of current armature.",
            "animation_name": "The name of current playing animation.",
            "time_scale": "The time scale of this armature.",
            "play_times": "The play times of the default animation.\n-1 means using the value of config file\n0 means repeat for ever\n>0 means repeat times",
            "debug_bones": "Indicates whether open debug bones",
            "enabled_batch": "Indicates whether enabled batch model",
            "render_mode": "The render mode of current armature. 'realtime' means realtime calculate animation data, support animation blend but low performance. 'sharedCache' means precomputation animation data and share data with same armature, high performance and less memery but not support animation blend. 'privateCache' means precomputation animation data but not share data with other same armature, high performance and more memery, not support animation blend",
        },
        'motionStreak': {
            'fadeTime': "Trail fragment fade time, in seconds",
            'minSeg': "The minimum distance between of the trail",
            'stroke': "The width of the trail",
            'texture': "The texture of the trail",
            'color': "The color of the trail",
            'fastMode': "Whether to enable fast mode"
        },
        "missing_scirpt": {
            "error_compiled": "Error on executing script, or the script reference is missing. Please check error log carefully and correct/recover your script. The component will be restored once scripting error is gone. If you no long need the missing script, please remove this component manually.",
            "error_not_compiled": "Error on compiling script. Please check error log carefully and correct your script. This component will be restored once compiling error is gone."
        },
        'collider': {
            'editing': 'Edit this collider component',
            'category': 'Collider component category',
            'mask': 'The collider mask can collide with this collider'
        },
        'particle_system': {
            'preview': 'Play particle in edit mode',
            'custom': 'If set custom to true, then use custom properties insteadof read particle file',
            'file': 'The plist file',
            'spriteFrame': 'SpriteFrame of Particle System',
            'texture': 'Texture of Particle System, readonly, please use spriteFrame to setup new texture',
            'particleCount': 'Current quantity of particles that are being simulated',
            'srcBlendFactor': 'Specify the source Blend Factor',
            'dstBlendFactor': 'Specify the destination Blend Factor',
            'playOnLoad': 'If set to true, the particle system will automatically start playing on onLoad',
            'autoRemoveOnFinish': 'Indicate whether the owner node will be auto-removed when it has no particles left',
            'duration': 'How many seconds the emitter wil run. -1 means forever',
            'emissionRate': 'Emission rate of the particles',
            'life': 'Life and variation of each particle setter',
            'totalParticles': 'Maximum particles of the system',
            'startColor': 'Start color of each particle',
            'startColorVar': 'Variation of the start color',
            'endColor': 'Ending color of each particle',
            'endColorVar': 'Variation of the end color',
            'angle': 'Angle and variation of each particle setter',
            'startSize': 'Start size and variation in pixels of each particle',
            'endSize': 'End size and variation in pixels of each particle',
            'startSpin': 'Start angle and variation of each particle',
            'endSpin': 'End angle and variation of each particle',
            'sourcePos': 'Source position of the emitter',
            'posVar': 'Variation of source position',
            'positionType': 'Particles movement type',
            'emitterMode': 'Particles emitter modes',
            'gravity': 'Gravity of the emitter',
            'speed': 'Speed and variation of the emitter',
            'tangentialAccel': 'Tangential acceleration and variation of each particle. Only available in Gravity mode ',
            'radialAccel': 'Acceleration and variation of each particle. Only available in Gravity mode',
            'rotationIsDir': 'Indicate whether the rotation of each particle equals to its direction. Only available in Gravity mode',
            'startRadius': 'Starting radius and variation of the particles. Only available in Radius mode',
            'endRadius': 'Ending radius and variation of the particles. Only available in Radius mode',
            'rotatePerS': 'Number of degress to rotate a particle around the source pos per second and variation. Only available in Radius mode',
        },
        "mask": {
            'type': 'The mask type',
            'spriteFrame': 'The mask image',
            'inverted': 'The Reverse mask (Not supported Canvas Mode)',
            'alphaThreshold': 'The alpha threshold，The content is drawn only where the stencil have pixel with alpha greater than the alphaThreshold (Not supported Canvas Mode)',
            'segements': 'The segements for ellipse mask'
        },
        'physics': {
            'rigidbody': {
                'enabledContactListener': 'Should enabled contact listener. When a collision is trigger, the collision callback will only be called when enabled contact listener.',
                'bullet': 'Is this a fast moving body that should be prevented from tunneling through other moving bodies?',
                'type': 'Rigidbody type : Static, Kinematic, Dynamic or Animated.',
                'allowSleep': 'Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.',
                'gravityScale': 'Scale the gravity applied to this body.',
                'linearDamping': 'Linear damping is use to reduce the linear velocity. The damping parameter can be larger than 1, but the damping effect becomes sensitive to the time step when the damping parameter is large.',
                'angularDamping': 'Angular damping is use to reduce the angular velocity. The damping parameter can be larger than 1 but the damping effect becomes sensitive to the time step when the damping parameter is large.',
                'linearVelocity': 'The linear velocity of the body\'s origin in world co-ordinates',
                'angularVelocity': 'The angular velocity of the body.',
                'fixedRotation': 'Should this body be prevented from rotating?',
                'awake': 'Is this body initially awake or sleeping?'
            },
            'physics_collider': {
                'density': 'The density',
                'sensor': 'A sensor collider collects contact information but never generates a collision response',
                'friction': 'The friction coefficient, usually in the range [0,1].',
                'restitution': 'The restitution (elasticity) usually in the range [0,1].',
                'anchor': 'The anchor of the rigidbody.',
                'connectedAnchor': 'The anchor of the connected rigidbody.',
                'connectedBody': 'The rigidbody to which the other end of the joint is attached.',
                'collideConnected': 'Should the two rigid bodies connected with this joint collide with each other?',
                'distance': 'The distance separating the two ends of the joint.',
                'frequency': 'The spring frequency.',
                'dampingRatio': 'The damping ratio.',
                'linearOffset': 'The linear offset from connected rigidbody to rigidbody.',
                'angularOffset': 'The angular offset from connected rigidbody to rigidbody.',
                'maxForce': 'The maximum force can be applied to rigidbody.',
                'maxTorque': 'The maximum torque can be applied to rigidbody.',
                'correctionFactor': 'The position correction factor in the range [0,1].',
                'mouseRegion': 'The node used to register touch evnet. If this is null, it will be the joint\'s node.',
                'target': 'The target point. The mouse joint will move choosed rigidbody to target point.',
                'localAxisA': 'The local joint axis relative to rigidbody.',
                'enableLimit': 'Enable joint distance limit?',
                'enableMotor': 'Enable joint motor?',
                'lowerLimit': 'The lower joint limit.',
                'upperLimit': 'The upper joint limit.',
                'maxMotorForce': 'The maxium force can be applied to rigidbody to rearch the target motor speed.',
                'motorSpeed': 'The expected motor speed.',
                'referenceAngle': 'The reference angle. An angle between bodies considered to be zero for the joint angle.',
                'lowerAngle': 'The lower angle.',
                'upperAngle': 'The upper angle.',
                'maxMotorTorque': 'The maxium torque can be applied to rigidbody to rearch the target motor speed.',
                'maxLength': 'The max length.',
                'offset': 'Position offset',
                'size': 'Box size',
                'radius': 'Circle radius',
                'tag': 'Tag. If a node has several collider components, you can judge which type of collider is collided according to the tag.',
                'points': 'Polygon points'
            }
        },
        'block_input_events': {
            'brief_help': 'This component will block all input events, preventing the input from penetrating into the underlying node, typically for the background of the top UI.'
        },
        'tiledtile': {
            'row': 'Specify the TiledTile horizontal coordinate，use map tile as the unit.',
            'column': 'Specify the TiledTile vertical coordinate，use map tile as the unit.',
            'gid': 'Specify the TiledTile gid.',
            'layer': 'Specify which TiledLayer the TiledTile belong to.'
        }
    }
};