// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public owner;
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votes;
    uint256 public totalCandidates;
    uint256 public startDate;
    uint256 public endDate;

    constructor() {
        owner = msg.sender;
    }

    function setVotingPeriod(uint256 _startDate, uint256 _endDate) public {
        require(msg.sender == owner, "Only owner can set the voting period");
        require(_startDate < _endDate, "Start date must be before end date");
        startDate = _startDate;
        endDate = _endDate;
    }

    function vote(uint256 candidateId) public {
        require(block.timestamp >= startDate && block.timestamp <= endDate, "Voting is not active");
        require(!hasVoted[msg.sender], "You have already voted");
        
        votes[candidateId]++;
        hasVoted[msg.sender] = true;
    }

    function getVotes(uint256 candidateId) public view returns (uint256) {
        return votes[candidateId];
    }

    function setTotalCandidates(uint256 _totalCandidates) public {
        require(msg.sender == owner, "Only owner can set the total number of candidates");
        totalCandidates = _totalCandidates;
    }
}
