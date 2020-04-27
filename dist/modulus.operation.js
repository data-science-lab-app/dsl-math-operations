"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
var ModulusOperation = /** @class */ (function (_super) {
    __extends(ModulusOperation, _super);
    function ModulusOperation() {
        var _this = _super.call(this) || this;
        _this.options = new ModulusOperationPluginOptions(_this);
        _this.inputs = new ModulusOperationPluginInputs(_this);
        _this.modulus = 0;
        return _this;
    }
    ModulusOperation.prototype.getOptions = function () {
        return this.options;
    };
    ModulusOperation.prototype.getInputs = function () {
        return this.inputs;
    };
    ModulusOperation.prototype.transform = function () {
        var _this = this;
        if (this.inputData) {
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(function (row) { return row.map(function (value) { return value % _this.modulus; }); })
            };
        }
        throw new Error('Modulus Operation didn\'t get any inputs.');
    };
    ModulusOperation.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    ModulusOperation.prototype.setMultiplier = function (adder) {
        this.modulus = adder;
    };
    return ModulusOperation;
}(data_science_lab_core_1.TransformPlugin));
exports.ModulusOperation = ModulusOperation;
var ModulusOperationPluginInputs = /** @class */ (function (_super) {
    __extends(ModulusOperationPluginInputs, _super);
    function ModulusOperationPluginInputs(converter) {
        var _this = _super.call(this) || this;
        _this.converter = converter;
        return _this;
    }
    ModulusOperationPluginInputs.prototype.submit = function (inputs) {
        this.converter.submit(inputs['features']);
    };
    ModulusOperationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'features',
                label: 'Features to be modulus by',
                min: 1,
                type: 'number'
            }
        ];
    };
    return ModulusOperationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var ModulusOperationPluginOptions = /** @class */ (function (_super) {
    __extends(ModulusOperationPluginOptions, _super);
    function ModulusOperationPluginOptions(operation) {
        var _this = _super.call(this) || this;
        _this.operation = operation;
        _this.state = 1;
        return _this;
    }
    ModulusOperationPluginOptions.prototype.submit = function (inputs) {
        this.operation.setMultiplier(inputs['number']);
        this.state = 2;
    };
    ModulusOperationPluginOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.NumberOption({
                id: 'number',
                label: 'Modulus',
            })
        ];
    };
    ModulusOperationPluginOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return ModulusOperationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
