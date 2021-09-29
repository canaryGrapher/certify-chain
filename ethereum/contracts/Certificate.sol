pragma solidity ^0.4.26;

contract Certificate{
    struct Cert{
        bytes32 hashValue;
        bool isValid;
    }
    
    mapping(string => Cert) ledger;
    address public admin;
    string public adminName;
    
    
    modifier restricted() {
        require(msg.sender == admin);
        _;
    }
    
    
    constructor(string _adminName) public {
        admin = msg.sender;
        adminName = _adminName;
    }
    
    
    function createCertificate(string certificateId, uint regNo, string studentName, string _adminName, string dateOfIssue, string description) 
        public restricted {
        
        bytes32 _hashValue = keccak256(abi.encodePacked(certificateId, regNo, studentName, _adminName, dateOfIssue, description));
        
        Cert memory newCert = Cert({
            hashValue: _hashValue,
            isValid: true
        });
        
        ledger[certificateId] = newCert;
    }
    
    
    function verify(string certificateId, uint regNo, string studentName, string _adminName, string dateOfIssue, string description) public view returns (bool) {
        
        bytes32 _hashValue = keccak256(abi.encodePacked(certificateId, regNo, studentName, _adminName, dateOfIssue, description));
        
        bool _isValid = (ledger[certificateId].hashValue == _hashValue && 
                            ledger[certificateId].isValid == true);
                            
        return _isValid;
    }
    
    
    function revoke(string certificateId) public restricted {
        ledger[certificateId].isValid = false;
    }


    function certificateStatus(string certificateId) public view returns(bool) {
        return ledger[certificateId].isValid;
    }
}
