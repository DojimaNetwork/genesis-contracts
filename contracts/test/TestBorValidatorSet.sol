pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

import {BorValidatorSet} from "../BulldogValidatorSet.sol";
import {TestSystem} from "./TestSystem.sol";

contract TestBorValidatorSet is BorValidatorSet, TestSystem {}
