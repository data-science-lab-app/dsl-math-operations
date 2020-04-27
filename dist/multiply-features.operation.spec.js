"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multiply_features_operation_1 = require("./multiply-features.operation");
describe('Multiply Features Operation Tests', function () {
    var converter;
    beforeEach(function () {
        converter = new multiply_features_operation_1.MultiplyFeaturesOperation();
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
    it('submit a two list of numbers should multiply them together', function () {
        converter.getInputs().submit({
            'features': {
                features: ['f1', 'f2'],
                examples: [[1, 2], [3, 4]]
            }
        });
        var data = converter.transform();
        expect(data).toEqual({
            features: ['f1 x f2'],
            examples: [[2], [12]]
        });
    });
    it('submit three list of numbers should multiply them together', function () {
        converter.getInputs().submit({
            'features': {
                features: ['f1', 'f2', 'f3'],
                examples: [[1, 2, 3], [4, 5, 6]]
            }
        });
        var data = converter.transform();
        expect(data).toEqual({
            features: ['f1 x f2 x f3'],
            examples: [[6], [120]]
        });
    });
});
