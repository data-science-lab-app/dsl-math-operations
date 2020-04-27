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
var AddOperation = /** @class */ (function (_super) {
    __extends(AddOperation, _super);
    function AddOperation() {
        var _this = _super.call(this) || this;
        _this.options = new AddOperationPluginOptions(_this);
        _this.inputs = new AddOperationPluginInputs(_this);
        _this.adder = 0;
        return _this;
    }
    AddOperation.prototype.getOptions = function () {
        return this.options;
    };
    AddOperation.prototype.getInputs = function () {
        return this.inputs;
    };
    AddOperation.prototype.transform = function () {
        var _this = this;
        if (this.inputData) {
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(function (row) { return row.map(function (value) { return value + _this.adder; }); })
            };
        }
        throw new Error('Add Operation didn\'t get any inputs.');
    };
    AddOperation.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    AddOperation.prototype.toAdd = function (adder) {
        this.adder = adder;
    };
    return AddOperation;
}(data_science_lab_core_1.TransformPlugin));
exports.AddOperation = AddOperation;
var AddOperationPluginInputs = /** @class */ (function (_super) {
    __extends(AddOperationPluginInputs, _super);
    function AddOperationPluginInputs(converter) {
        var _this = _super.call(this) || this;
        _this.converter = converter;
        return _this;
    }
    AddOperationPluginInputs.prototype.submit = function (inputs) {
        this.converter.submit(inputs['features']);
    };
    AddOperationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'features',
                label: 'Features to be add by',
                min: 1,
                type: 'number'
            }
        ];
    };
    return AddOperationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var AddOperationPluginOptions = /** @class */ (function (_super) {
    __extends(AddOperationPluginOptions, _super);
    function AddOperationPluginOptions(operation) {
        var _this = _super.call(this) || this;
        _this.operation = operation;
        _this.state = 1;
        return _this;
    }
    AddOperationPluginOptions.prototype.submit = function (inputs) {
        this.operation.toAdd(inputs['number']);
        this.state = 2;
    };
    AddOperationPluginOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.NumberOption({
                id: 'number',
                label: 'Number to add to feature',
            })
        ];
    };
    AddOperationPluginOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return AddOperationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
