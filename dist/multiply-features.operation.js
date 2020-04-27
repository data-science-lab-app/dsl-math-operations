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
var MultiplyFeaturesOperation = /** @class */ (function (_super) {
    __extends(MultiplyFeaturesOperation, _super);
    function MultiplyFeaturesOperation() {
        var _this = _super.call(this) || this;
        _this.options = new MultiplyFeaturesOperationPluginOptions();
        _this.inputs = new MultiplyFeaturesOperationPluginInputs(_this);
        return _this;
    }
    MultiplyFeaturesOperation.prototype.getOptions = function () {
        return this.options;
    };
    MultiplyFeaturesOperation.prototype.getInputs = function () {
        return this.inputs;
    };
    MultiplyFeaturesOperation.prototype.transform = function () {
        if (this.inputData) {
            return {
                features: [this.inputData.features.join(' x ')],
                examples: this.inputData.examples.map(function (example) {
                    return [
                        example.reduce(function (accumlator, current) { return accumlator * current; })
                    ];
                })
            };
        }
        throw new Error('Multiply Features Operation didn\'t get any inputs.');
    };
    MultiplyFeaturesOperation.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    return MultiplyFeaturesOperation;
}(data_science_lab_core_1.TransformPlugin));
exports.MultiplyFeaturesOperation = MultiplyFeaturesOperation;
var MultiplyFeaturesOperationPluginInputs = /** @class */ (function (_super) {
    __extends(MultiplyFeaturesOperationPluginInputs, _super);
    function MultiplyFeaturesOperationPluginInputs(converter) {
        var _this = _super.call(this) || this;
        _this.converter = converter;
        return _this;
    }
    MultiplyFeaturesOperationPluginInputs.prototype.submit = function (inputs) {
        this.converter.submit(inputs['features']);
    };
    MultiplyFeaturesOperationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'features',
                label: 'Features to multiply together',
                min: 2,
                type: 'number'
            }
        ];
    };
    return MultiplyFeaturesOperationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var MultiplyFeaturesOperationPluginOptions = /** @class */ (function (_super) {
    __extends(MultiplyFeaturesOperationPluginOptions, _super);
    function MultiplyFeaturesOperationPluginOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiplyFeaturesOperationPluginOptions.prototype.submit = function (inputs) {
        throw new Error("Multiply Features Operation has no submit options.");
    };
    MultiplyFeaturesOperationPluginOptions.prototype.options = function () {
        throw new Error("Multiply Features Operation has no options.");
    };
    MultiplyFeaturesOperationPluginOptions.prototype.noMore = function () {
        return true;
    };
    return MultiplyFeaturesOperationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
