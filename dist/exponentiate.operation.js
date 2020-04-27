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
var ExponentiateOperation = /** @class */ (function (_super) {
    __extends(ExponentiateOperation, _super);
    function ExponentiateOperation() {
        var _this = _super.call(this) || this;
        _this.options = new ExponentiateOperationPluginOptions(_this);
        _this.inputs = new ExponentiateOperationPluginInputs(_this);
        _this.power = 0;
        return _this;
    }
    ExponentiateOperation.prototype.getOptions = function () {
        return this.options;
    };
    ExponentiateOperation.prototype.getInputs = function () {
        return this.inputs;
    };
    ExponentiateOperation.prototype.transform = function () {
        var _this = this;
        if (this.inputData) {
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(function (row) { return row.map(function (value) { return Math.pow(value, _this.power); }); })
            };
        }
        throw new Error('Exponentiate Operation didn\'t get any inputs.');
    };
    ExponentiateOperation.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    ExponentiateOperation.prototype.setPower = function (adder) {
        this.power = adder;
    };
    return ExponentiateOperation;
}(data_science_lab_core_1.TransformPlugin));
exports.ExponentiateOperation = ExponentiateOperation;
var ExponentiateOperationPluginInputs = /** @class */ (function (_super) {
    __extends(ExponentiateOperationPluginInputs, _super);
    function ExponentiateOperationPluginInputs(converter) {
        var _this = _super.call(this) || this;
        _this.converter = converter;
        return _this;
    }
    ExponentiateOperationPluginInputs.prototype.submit = function (inputs) {
        this.converter.submit(inputs['features']);
    };
    ExponentiateOperationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'features',
                label: 'Features to be the base of power',
                min: 1,
                type: 'number'
            }
        ];
    };
    return ExponentiateOperationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var ExponentiateOperationPluginOptions = /** @class */ (function (_super) {
    __extends(ExponentiateOperationPluginOptions, _super);
    function ExponentiateOperationPluginOptions(operation) {
        var _this = _super.call(this) || this;
        _this.operation = operation;
        _this.state = 1;
        return _this;
    }
    ExponentiateOperationPluginOptions.prototype.submit = function (inputs) {
        this.operation.setPower(inputs['number']);
        this.state = 2;
    };
    ExponentiateOperationPluginOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.NumberOption({
                id: 'number',
                label: 'Power',
            })
        ];
    };
    ExponentiateOperationPluginOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return ExponentiateOperationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
