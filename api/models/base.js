'use strict';

class BaseModel {

    constructor(collectionName) {

        this._mongoose   = require('mongoose');
        this._collection = collectionName;
        this._schema     = null;

        this.defineSchema();
    }

    /**
     * Get mongoose instance
     *
     * @returns {*}
     */
    get mongoose() {
        return this._mongoose;
    }

    /**
     * Get mongoose model instance
     *
     * @returns {*}
     */
    get model() {
        return this._model;
    }

    /**
     * Define schema, MUST be override
     */
    defineSchema() {

    }

    /**
     * Obtain Mongoose schema
     *
     * @param schemaObjectDef
     * @returns {null|*}
     */
    createSchema(schemaObjectDef) {

        this._schemaObjectDef = schemaObjectDef;

        this._schema = this.mongoose.Schema(this._schemaObjectDef);

        return this._schema;
    }

    /**
     * Reginster mongoose schema
     *
     * @param schema
     * @param collectionName
     */
    registerSchema(schema, collectionName) {
        if (collectionName != null) {
            this._collection = collectionName;
        }

        if (schema != null) {
            this._schema = schema;
        }

        this._model = this.mongoose.model(this._collection, this._schema)
    }
}

/**
 * Export BaseModel class
 *
 * @type {BaseModel}
 */
module.exports = BaseModel;