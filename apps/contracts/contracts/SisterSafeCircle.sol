// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISelfRegistry {
    function isVerified(address user) external view returns (bool);
}

contract SisterSafeCircle {
    ISelfRegistry public immutable selfRegistry;
    mapping(address => bool) public isVerified;
    mapping(bytes32 => address[]) public circleMembers;
    mapping(address => bool) public hasJoined;

    event UserVerified(address indexed user);
    event CircleCreated(bytes32 indexed circleId, address indexed creator);
    event JoinedCircle(bytes32 indexed circleId, address indexed user);

    constructor(address registry) {
        selfRegistry = ISelfRegistry(registry);
    }

    function verifyUser() external {
        address caller = msg.sender;
        if (address(selfRegistry) != address(0)) {
            require(selfRegistry.isVerified(caller), "Self verification required");
        }
        require(!isVerified[caller], "Already verified");
        isVerified[caller] = true;
        emit UserVerified(msg.sender);
    }

    function createCircle(bytes32 circleId) external {
        require(isVerified[msg.sender], "Not verified");
        require(circleMembers[circleId].length == 0, "Circle already exists");

        circleMembers[circleId].push(msg.sender);
        hasJoined[msg.sender] = true;

        emit CircleCreated(circleId, msg.sender);
    }

    function joinCircle(bytes32 circleId) external {
        require(isVerified[msg.sender], "Not verified");
        require(!hasJoined[msg.sender], "Already joined");

        require(circleMembers[circleId].length > 0, "Circle does not exist");

        circleMembers[circleId].push(msg.sender);
        hasJoined[msg.sender] = true;

        emit JoinedCircle(circleId, msg.sender);
    }

    function getMembers(bytes32 circleId) external view returns (address[] memory) {
        return circleMembers[circleId];
    }
}
