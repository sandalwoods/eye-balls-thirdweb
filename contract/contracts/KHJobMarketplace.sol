//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract KHJobMarketplace {
    address public nftAddress;
    address payable public publisher;
    address public inspector;
    address public funder;

    modifier onlyApplicant(uint256 _nftID) {
        require(
            msg.sender == applicant[_nftID],
            "Only applicant can call this method"
        );
        _;
    }

    modifier onlyPublisher() {
        require(msg.sender == publisher, "Only publisher can call this method");
        _;
    }

    modifier onlyInspector() {
        require(msg.sender == inspector, "Only inspector can call this method");
        _;
    }

    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public jobPrice;
    mapping(uint256 => uint256) public escrowAmount;
    mapping(uint256 => address) public applicant;
    mapping(uint256 => bool) public inspectionPassed;
    mapping(uint256 => mapping(address => bool)) public approval;

    constructor(
        address _nftAddress,
        address payable _publisher,
        address _inspector,
        address _funder
    ) {
        nftAddress = _nftAddress;
        publisher = _publisher;
        inspector = _inspector;
        funder = _funder;
    }

    function list(
        uint256 _nftID,
        address _applicant,
        uint256 _jobPrice,
        uint256 _escrowAmount
    ) public payable onlyPublisher {
        // Transfer NFT from publisher to this contract
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftID);

        isListed[_nftID] = true;
        jobPrice[_nftID] = _jobPrice;
        escrowAmount[_nftID] = _escrowAmount;
        applicant[_nftID] = _applicant;
    }

    // Put Under Contract (only applicant - payable escrow)
    function depositEarnest(
        uint256 _nftID
    ) public payable onlyApplicant(_nftID) {
        require(msg.value >= escrowAmount[_nftID]);
    }

    // Update Inspection Status (only inspector)
    function updateInspectionStatus(
        uint256 _nftID,
        bool _passed
    ) public onlyInspector {
        inspectionPassed[_nftID] = _passed;
    }

    // Approve Sale
    function approveSale(uint256 _nftID) public {
        approval[_nftID][msg.sender] = true;
    }

    // Finalize application
    // -> Require inspection status (add more items here, like job reviewers)
    // -> Require publisher to be authorized
    // -> Require funds to be correct amount
    // -> Transfer NFT to buyer
    // -> Transfer Funds to applicant
    function finalizeApplication(uint256 _nftID) public {
        require(inspectionPassed[_nftID]);
        require(approval[_nftID][applicant[_nftID]]);
        require(approval[_nftID][publisher]);
        require(approval[_nftID][funder]);
        require(address(this).balance >= jobPrice[_nftID]);

        isListed[_nftID] = false;

        (bool success, ) = payable(applicant[_nftID]).call{
            value: address(this).balance
        }("");
        require(success);

        IERC721(nftAddress).transferFrom(
            address(this),
            applicant[_nftID],
            _nftID
        );
    }

    // Cancel application (handle earnest deposit)
    // -> if inspection status is not approved, then refund, otherwise to funder
    function cancelApplication(uint256 _nftID) public {
        if (inspectionPassed[_nftID] == false) {
            payable(applicant[_nftID]).transfer(address(this).balance);
        } else {
            payable(funder).transfer(address(this).balance);
        }
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}

    fallback() external payable {}
}
