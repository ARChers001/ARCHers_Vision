"use strict";
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRevertReason = exports.parseTransactionError = void 0;
const web3_errors_1 = require("web3-errors");
const web3_eth_abi_1 = require("web3-eth-abi");
const web3_types_1 = require("web3-types");
// eslint-disable-next-line import/no-cycle
const rpc_method_wrappers_js_1 = require("../rpc_method_wrappers.js");
const parseTransactionError = (error, contractAbi) => {
    var _a, _b, _c, _d, _e;
    if (error instanceof web3_errors_1.ContractExecutionError && error.cause instanceof web3_errors_1.Eip838ExecutionError) {
        if (contractAbi !== undefined) {
            const errorsAbi = contractAbi.filter(abi => (0, web3_eth_abi_1.isAbiErrorFragment)(abi));
            (0, web3_eth_abi_1.decodeContractErrorData)(errorsAbi, error.cause);
            return {
                reason: error.cause.message,
                signature: (_a = error.cause.data) === null || _a === void 0 ? void 0 : _a.slice(0, 10),
                data: (_b = error.cause.data) === null || _b === void 0 ? void 0 : _b.substring(10),
                customErrorName: error.cause.errorName,
                customErrorDecodedSignature: error.cause.errorSignature,
                customErrorArguments: error.cause.errorArgs,
            };
        }
        return {
            reason: error.cause.message,
            signature: (_c = error.cause.data) === null || _c === void 0 ? void 0 : _c.slice(0, 10),
            data: (_d = error.cause.data) === null || _d === void 0 ? void 0 : _d.substring(10),
        };
    }
    if (error instanceof web3_errors_1.InvalidResponseError &&
        !Array.isArray((_e = error.cause) === null || _e === void 0 ? void 0 : _e.errors) &&
        error.cause !== undefined) {
        return error.cause.message;
    }
    throw error;
};
exports.parseTransactionError = parseTransactionError;
/**
 *	Returns the revert reason generated by the EVM if the transaction were to be executed.
 *
 * @param web3Context - ({@link Web3Context}) Web3 configuration object that contains things such as the provider, request manager, wallet, etc.
 * @param transaction - A transaction object where all properties are optional except `to`, however it's recommended to include the `from` property or it may default to `0x0000000000000000000000000000000000000000` depending on your node or provider.
 * @returns `undefined` if no revert reason was given, a revert reason object, a revert reason string, or an `unknown` error
 */
function getRevertReason(web3Context, transaction, contractAbi, returnFormat = web3_types_1.DEFAULT_RETURN_FORMAT) {
    return __awaiter(this, void 0, void 0, function*() {
        try {
            yield(0, rpc_method_wrappers_js_1.call)(web3Context, transaction, web3Context.defaultBlock, returnFormat);
            return undefined;
        } catch (error) {
            return (0, exports.parseTransactionError)(error, contractAbi);
        }
    });
}
exports.getRevertReason = getRevertReason;
//# sourceMappingURL=get_revert_reason.js.map