/****************************************************************************
 Copyright (c) 20179 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
let ammo = require("./lib/ammo");

let Physics3DManager = cc.Class({
    name: 'cc.Physics3DManager',

    properties: {
        maxSubStep: 1.0,
        fixedTimeStep: 1.0 / 60.0
    },

    ctor () {
        this._vector3Zero = null;
        this._quaternion = null;

        this._collisionConfiguration = null;
        this._dispatcher = null;
        this._broadphase = null;
        this._discreteDynamicsWorld = null;
        this._collisionWorld = null;

        this._solverInfo = null;
        this._dispatchInfo = null;

        this._closestRayResultCallback = null;
		this._allHitsRayResultCallback = null;
		this._closestConvexResultCallback = null;
        this._allConvexResultCallback = null;
        
        this._transformList = [];
        this._physics3DObjectMap = {};

        cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
        this.init();
    },

    init (isCollisionOnly) {

        let vec30 = this._vector3Zero = new ammo.btVector3(0, 0, 0);
		this._quaternion = new ammo.btQuaternion(0, 0, 0, 1);

        this._collisionConfiguration = new ammo.btDefaultCollisionConfiguration();
		this._dispatcher = new ammo.btCollisionDispatcher(this._collisionConfiguration);
		this._broadphase = new ammo.btDbvtBroadphase();
        this._broadphase.getOverlappingPairCache().setInternalGhostPairCallback(new ammo.btGhostPairCallback());
        
        if (!isCollisionOnly) {
            let solver = this._solver = new ammo.btSequentialImpulseConstraintSolver();
            this._discreteDynamicsWorld = new ammo.btDiscreteDynamicsWorld(this._dispatcher, this._broadphase, solver, this._collisionConfiguration);
            this._collisionWorld = this._discreteDynamicsWorld;

            this._solverInfo = this._discreteDynamicsWorld.getSolverInfo();
            this._dispatchInfo = this._discreteDynamicsWorld.getDispatchInfo();
        } else {
            this._collisionWorld = new ammo.btCollisionWorld(this._dispatcher, this._broadphase, this._collisionConfiguration);
        }

        this._closestRayResultCallback = new ammo.ClosestRayResultCallback(vec30, vec30);
		this._allHitsRayResultCallback = new ammo.AllHitsRayResultCallback(vec30, vec30);
		this._closestConvexResultCallback = new ammo.ClosestConvexResultCallback(vec30, vec30);
		this._allConvexResultCallback = new ammo.AllConvexResultCallback(vec30, vec30);
		ammo._btGImpactCollisionAlgorithm_RegisterAlgorithm(this._dispatcher.a);
    },

    destroy () {
		if (this._discreteDynamicsWorld) {
			ammo.destroy(this._discreteDynamicsWorld);
			this._discreteDynamicsWorld = null;
		} else if (this._collisionWorld) {
            ammo.destroy(this._collisionWorld);
			this._collisionWorld = null;
        }
        
        if (this._broadphase) {
            ammo.destroy(this._broadphase);
            this._broadphase = null;
        }
        
        if (this._dispatcher) {
            ammo.destroy(this._dispatcher);
            this._dispatcher = null;
        }
        
        if (this._collisionConfiguration) {
            ammo.destroy(this._collisionConfiguration);
            this._collisionConfiguration = null;
        }

        if (this._solver) {
            ammo.destroy(this._solver);
            this._solver = null;
        }

        if (this._closestRayResultCallback) {
            ammo.destroy(this._closestRayResultCallback);
            this._closestRayResultCallback = null;
        }

        if (this._allHitsRayResultCallback) {
            ammo.destroy(this._allHitsRayResultCallback);
            this._allHitsRayResultCallback = null;
        }

        if (this._closestConvexResultCallback) {
            ammo.destroy(this._closestConvexResultCallback);
            this._closestConvexResultCallback = null;
        }

        if (this._allConvexResultCallback) {
            ammo.destroy(this._allConvexResultCallback);
            this._allConvexResultCallback = null;
        }

        if (this._vector3Zero) {
            ammo.destroy(this._vector3Zero);
            this._vector3Zero = null;
        }

        if (this._quaternion) {
            ammo.destroy(this._quaternion);
            this._quaternion = null;
        }
    },

    update (dt) {
        this._updatePhysicsTransfrom();
        this._simulator(dt);
        this._updateCollision();
        this._executeCallback();
    },

    /// private interface

    _registerPhysics3D (object) {
        this._physics3DObjectMap[object._id] = object;
    },

    _unregisterPhysics3D (object) {
        delete this._physics3DObjectMap[object._id];
    },

    _simulator (dt) {
        if (this._discreteDynamicsWorld) {
            this._discreteDynamicsWorld.stepSimulation(dt, this.maxSubStep, this.fixedTimeStep);
        } else {
            this._collisionWorld.performDiscreteCollisionDetection();
        }
    },

    _updatePhysicsTransform () {
        for (let i = 0; i < this._transformList.length; i++) {
            let object = this._transformList[i];
            object._inTransformList = false;
            object._updatePhysicsTransform();
        }
        this._transformList.length = 0;
    },

    _updateCollision () {
        this._collisionsUtils.recoverAllContactPointsPool();
		var previous=this._currentFrameCollisions;
		this._currentFrameCollisions=this._previousFrameCollisions;
		this._currentFrameCollisions.length=0;
		this._previousFrameCollisions=previous;
        var loopCount=Stat.loopCount;
        
		let numManifolds = this._dispatcher.getNumManifolds();
		for (let i = 0; i < numManifolds; i++) {
			let contactManifold = this._dispatcher.getManifoldByIndexInternal(i);
			let componentA = this._physics3DObjectMap[contactManifold.getBody0().getUserIndex()];
			let componentB = this._physics3DObjectMap[contactManifold.getBody1().getUserIndex()];
			let collision = null;
			let isFirstCollision = false;
            let contacts = null;

			let isTrigger = componentA.isTrigger || componentB.isTrigger;
			if (isTrigger && ((componentA.owner)._needProcessTriggers || (componentB.owner)._needProcessTriggers)){
				var numContacts=contactManifold.getNumContacts();
				for (var j=0;j < numContacts;j++){
					var pt=contactManifold.getContactPoint(j);
					var distance=pt.getDistance();
					if (distance <=0){
						collision=this._collisionsUtils.getCollision(componentA,componentB);
						contacts=collision.contacts;
						isFirstCollision=collision._updateFrame!==loopCount;
						if (isFirstCollision){
							collision._isTrigger=true;
							contacts.length=0;
						}
						break ;
					}
				}
			}else if ((componentA.owner)._needProcessCollisions || (componentB.owner)._needProcessCollisions){
				if (componentA._enableProcessCollisions || componentB._enableProcessCollisions){
					numContacts=contactManifold.getNumContacts();
					for (j=0;j < numContacts;j++){
						pt=contactManifold.getContactPoint(j);
						distance=pt.getDistance();
						if (distance <=0){
							var contactPoint=this._collisionsUtils.getContactPoints();
							contactPoint.colliderA=componentA;
							contactPoint.colliderB=componentB;
							contactPoint.distance=distance;
							var nativeNormal=pt.get_m_normalWorldOnB();
							var normal=contactPoint.normal;
							normal.x=-nativeNormal.x();
							normal.y=nativeNormal.y();
							normal.z=nativeNormal.z();
							var nativePostionA=pt.get_m_positionWorldOnA();
							var positionOnA=contactPoint.positionOnA;
							positionOnA.x=-nativePostionA.x();
							positionOnA.y=nativePostionA.y();
							positionOnA.z=nativePostionA.z();
							var nativePostionB=pt.get_m_positionWorldOnB();
							var positionOnB=contactPoint.positionOnB;
							positionOnB.x=-nativePostionB.x();
							positionOnB.y=nativePostionB.y();
							positionOnB.z=nativePostionB.z();
							if (!collision){
								collision=this._collisionsUtils.getCollision(componentA,componentB);
								contacts=collision.contacts;
								isFirstCollision=collision._updateFrame!==loopCount;
								if (isFirstCollision){
									collision._isTrigger=false;
									contacts.length=0;
								}
							}
							contacts.push(contactPoint);
						}
					}
				}
			}
			if (collision && isFirstCollision){
				this._currentFrameCollisions.push(collision);
				collision._setUpdateFrame(loopCount);
			}
		}
    },

    _executeCallback () {

    },

    _getCollisionWorld () {
        return this._collisionWorld;
    },

    _addToTransformList (physicsObject) {
        if (physicsObject._inTransformList) return;
        physicsObject._inTransformList = true;
        this._transformList.push(physicsObject);
    },

    _removeFromTransformList (physicsObject) {
        if (!physicsObject._inTransformList) return;
        physicsObject._inTransformList = false;
        let index = this._transformList.indexOf(physicsObject);
        if (index >= 0) {
            this._transformList.splice(index, 1);
        }
    },

    _addCollider (collider, group, mask) {
        this._collisionWorld.addCollisionObject(collider, group, mask);
    },

    _removeCollider (collider) {
        this._collisionWorld.removeCollisionObject(collider);
    },

    _addRigidBody (rigidBody, group, mask) {
        if (!this._discreteDynamicsWorld) {
            cc.error("Physics3DManager: can not invoke addRigidBody when the physics engine is set to collision only");
            return;
        }
        this._collisionWorld.addRigidBody(rigidBody, group, mask);
    },

    _removeRigidBody (rigidBody) {
        if (!this._discreteDynamicsWorld) {
            cc.error("Physics3DManager: can not invoke removeRigidBody when the physics engine is set to collision only");
            return;
        }
        this._collisionWorld.removeRigidBody(rigidBody);
    }
});

module.exports = cc.Physics3DManager = Physics3DManager;