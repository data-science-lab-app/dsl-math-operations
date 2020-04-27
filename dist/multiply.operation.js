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
var MultiplyOperation = /** @class */ (function (_super) {
    __extends(MultiplyOperation, _super);
    function MultiplyOperation() {
        var _this = _super.call(this) || this;
        _this.options = new MultiplyOperationPluginOptions(_this);
        _this.inputs = new MultiplyOperationPluginInputs(_this);
        _this.multipler = 0;
        return _this;
    }
    MultiplyOperation.prototype.getOptions = function () {
        return this.options;
    };
    MultiplyOperation.prototype.getInputs = function () {
        return this.inputs;
    };
    MultiplyOperation.prototype.transform = function () {
        var _this = this;
        if (this.inputData) {
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(function (row) { return row.map(function (value) { return value * _this.multipler; }); })
            };
        }
        throw new Error('Multiply Operation didn\'t get any inputs.');
    };
    MultiplyOperation.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    MultiplyOperation.prototype.setMultiplier = function (adder) {
        this.multipler = adder;
    };
    return MultiplyOperation;
}(data_science_lab_core_1.TransformPlugin));
exports.MultiplyOperation = MultiplyOperation;
var MultiplyOperationPluginInputs = /** @class */ (function (_super) {
    __extends(MultiplyOperationPluginInputs, _super);
    function MultiplyOperationPluginInputs(converter) {
        var _this = _super.call(this) || this;
        _this.converter = converter;
        return _this;
    }
    MultiplyOperationPluginInputs.prototype.submit = function (inputs) {
        this.converter.submit(inputs['features']);
    };
    MultiplyOperationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'features',
                label: 'Features to be multiply by',
                min: 1,
                type: 'number'
            }
        ];
    };
    return MultiplyOperationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var MultiplyOperationPluginOptions = /** @class */ (function (_super) {
    __extends(MultiplyOperationPluginOptions, _super);
    function MultiplyOperationPluginOptions(operation) {
        var _this = _super.call(this) || this;
        _this.operation = operation;
        _this.state = 1;
        return _this;
    }
    MultiplyOperationPluginOptions.prototype.submit = function (inputs) {
        this.operation.setMultiplier(inputs['number']);
        this.state = 2;
    };
    MultiplyOperationPluginOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.NumberOption({
                id: 'number',
                label: 'Multiplier',
            })
        ];
    };
    MultiplyOperationPluginOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return MultiplyOperationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
