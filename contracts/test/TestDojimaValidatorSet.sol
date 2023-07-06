pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

import {DojimaValidatorSet} from "../DojimaValidatorSet.sol";
import {TestSystem} from "./TestSystem.sol";

contract TestDojimaValidatorSet is DojimaValidatorSet, TestSystem {}
