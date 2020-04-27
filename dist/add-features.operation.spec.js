"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_features_operation_1 = require("./add-features.operation");
describe('Add Features Operation Tests', function () {
    var converter;
    beforeEach(function () {
        converter = new add_features_operation_1.AddFeaturesOperation();
    });
    it('options should return true for no more', function () {
        expect(converter.getOptions().noMore()).toBeTruthy();
    });
    it('options should throw for options', function (done) {
        try {
            converter.getOptions().options();
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('options should throw for submit', function (done) {
        try {
            converter.getOptions().submit({});
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('inputs should return one inputs', function () {
        expect(converter.getInputs().inputs().length).toBe(1);
    });
    it('submit a two list of numbers should add them together', function () {
        converter.getInputs().submit({
            'features': {
                features: ['f1', 'f2'],
                examples: [[1, 2], [3, 4]]
            }
        });
        var data = converter.transform();
        expect(data).toEqual({
            features: ['f1 + f2'],
            examples: [[3], [7]]
        });
    });
    it('submit three list of numbers should add them together', function () {
        converter.getInputs().submit({
            'features': {
                features: ['f1', 'f2', 'f3'],
                examples: [[1, 2, 3], [4, 5, 6]]
            }
        });
        var data = converter.transform();
        expect(data).toEqual({
            features: ['f1 + f2 + f3'],
            examples: [[6], [15]]
        });
    });
});
