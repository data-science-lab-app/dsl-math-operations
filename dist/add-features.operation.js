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
var AddFeaturesOperation = /** @class */ (function (_super) {
    __extends(AddFeaturesOperation, _super);
    function AddFeaturesOperation() {
        var _this = _super.call(this) || this;
        _this.options = new AddFeaturesOperationPluginOptions();
        _this.inputs = new AddFeaturesOperationPluginInputs(_this);
        return _this;
    }
    AddFeaturesOperation.prototype.getOptions = function () {
        return this.options;
    };
    AddFeaturesOperation.prototype.getInputs = function () {
        return this.inputs;
    };
    AddFeaturesOperation.prototype.transform = function () {
        if (this.inputData) {
            return {
                features: [this.inputData.features.join(' + ')],
                examples: this.inputData.examples.map(function (example) {
                    return [
                        example.reduce(function (accumlator, current) { return accumlator + current; })
                    ];
                })
            };
        }
        throw new Error('Add Features Operation didn\'t get any inputs.');
    };
    AddFeaturesOperation.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    return AddFeaturesOperation;
}(data_science_lab_core_1.TransformPlugin));
exports.AddFeaturesOperation = AddFeaturesOperation;
var AddFeaturesOperationPluginInputs = /** @class */ (function (_super) {
    __extends(AddFeaturesOperationPluginInputs, _super);
    function AddFeaturesOperationPluginInputs(converter) {
        var _this = _super.call(this) || this;
        _this.converter = converter;
        return _this;
    }
    AddFeaturesOperationPluginInputs.prototype.submit = function (inputs) {
        this.converter.submit(inputs['features']);
    };
    AddFeaturesOperationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'features',
                label: 'Features to add together',
                min: 2,
                type: 'number'
            }
        ];
    };
    return AddFeaturesOperationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var AddFeaturesOperationPluginOptions = /** @class */ (function (_super) {
    __extends(AddFeaturesOperationPluginOptions, _super);
    function AddFeaturesOperationPluginOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddFeaturesOperationPluginOptions.prototype.submit = function (inputs) {
        throw new Error("Add Features Operation has no submit options.");
    };
    AddFeaturesOperationPluginOptions.prototype.options = function () {
        throw new Error("Add Features Operation has no options.");
    };
    AddFeaturesOperationPluginOptions.prototype.noMore = function () {
        return true;
    };
    return AddFeaturesOperationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
