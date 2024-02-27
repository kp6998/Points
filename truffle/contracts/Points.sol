// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Points{
    struct UserDetails {
        string fullName;
        string fatherName;
        string birthDate;
        address userAddress;
    }
    mapping (string => UserDetails) public mpUserDetails;
    struct UserPoints {
        uint256 upPoints;
        uint256 downPoints;
    }
    mapping (string => UserPoints) public mpPoints;
    event PointsNotUpdated(string message);

    function RegUserDetails(
        string memory userName,
        string memory fullName,
        string memory fatherName,
        string memory birthDate
    ) public {
        require(mpUserDetails[userName].userAddress == address(0), "User details already registered");
        UserDetails memory objUsrDtls = UserDetails({
            fullName: fullName,
            fatherName: fatherName,
            birthDate: birthDate,
            userAddress: msg.sender
        });
        mpUserDetails[userName] = objUsrDtls;
    }

    function Login(string memory userName) external view returns(bool){
        return mpUserDetails[userName].userAddress == msg.sender;
    }

    function GetUserPoints(string memory userName) external view returns(uint256 upPoints, uint256 downPoints){
        upPoints = mpPoints[userName].upPoints;
        downPoints = mpPoints[userName].downPoints;
    }

    function GetUserDetails(string memory userName) external view returns(
        string memory fullName,
        string memory fatherName,
        string memory birthDate,
        address userAddress,
        uint256 upPoints, 
        uint256 downPoints
    ){
        UserDetails memory obj = mpUserDetails[userName];
        fullName = obj.fullName;
        fatherName = obj.fatherName;
        birthDate = obj.birthDate;
        userAddress = obj.userAddress;
        upPoints = mpPoints[userName].upPoints;
        downPoints = mpPoints[userName].downPoints;
    }

    function SetPointsUp(string memory sender, string memory receiver) public {
        if(keccak256(abi.encodePacked(sender)) != keccak256(abi.encodePacked(receiver))) mpPoints[receiver].upPoints += 1; 
        else emit PointsNotUpdated("Cannot up points yourself");
    }

    function SetPointsDown(string memory sender, string memory receiver) public {
        if(keccak256(abi.encodePacked(sender)) != keccak256(abi.encodePacked(receiver))) mpPoints[receiver].downPoints += 1; 
        else emit PointsNotUpdated("Cannot down points yourself");
    }
}