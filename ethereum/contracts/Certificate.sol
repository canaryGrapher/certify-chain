pragma solidity ^0.4.26;

contract Certificate {

    struct Cert {
        bytes32 hashValue;
        bool isValid;
    }

    mapping(string => Cert) ledger;
    mapping(address => bool) public adminMap;
    address[] public adminLedger;
    address public adminMaster;
    string public orgName;

    modifier restricted() {
        require(adminMap[msg.sender] == true);
        _;
    }

    constructor(string _orgName) public {
        adminMaster = msg.sender;
        orgName = _orgName;
        adminMap[msg.sender] = true;
        adminLedger.push(msg.sender);
    }

    function createCertificate(
        string certificateId,
        string regNo,
        string studentName,
        string _orgName,
        string dateOfIssue,
        string description
    ) public restricted {
        bytes32 _hashValue = keccak256(
            abi.encodePacked(
                certificateId,
                regNo,
                studentName,
                _orgName,
                dateOfIssue,
                description
            )
        );

        Cert memory newCert = Cert({hashValue: _hashValue, isValid: true});

        ledger[certificateId] = newCert;
    }

    function verify(
        string certificateId,
        string regNo,
        string studentName,
        string _orgName,
        string dateOfIssue,
        string description
    ) public view returns (bool) {
        bytes32 _hashValue = keccak256(
            abi.encodePacked(
                certificateId,
                regNo,
                studentName,
                _orgName,
                dateOfIssue,
                description
            )
        );

        bool _isValid = (ledger[certificateId].hashValue == _hashValue &&
            ledger[certificateId].isValid == true);

        return _isValid;
    }

    function revoke(string certificateId) public restricted {
        ledger[certificateId].isValid = false;
    }

    function certificateStatus(string certificateId) public view returns (bool) {
        return ledger[certificateId].isValid;
    }

    function addAdmin(address adminAddress) public restricted {
        adminMap[adminAddress] = true;
        adminLedger.push(adminAddress);
    }
}