//SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RexHot {
    struct Post {
        uint id;
        address poster;
        string content;
        uint timePosted;
        uint tips;
    }

    struct User {
        address user;
        uint256 totalTips;
        uint256 id;
        uint8 status;
        Post[] posts;
    }

    uint postId = 0;
    uint userId = 0;
    //30% burn fee while tipping
    uint burnFee = 30;
    IERC20 rexHotToken;
    address public treasury;
    mapping(uint => User) userIndex;
    mapping(uint => Post) postIndex;
    mapping(address => uint) userProf;

    event Tipped(address indexed _from, address indexed _to, uint amount);
    event NewPost(uint _postId, address _owner, uint _timePosted);
    event NewFollow(
        address _followed,
        address _follower,
        uint _currentFollowerCount
    );

    modifier validUser(address _user) {
        require(
            userIndex[userProf[_user]].user != address(0),
            "User not registered"
        );
        _;
    }

    modifier notUser(address _user) {
        require(
            userIndex[userProf[_user]].user == address(0),
            "User already registered"
        );
        _;
    }

    modifier postExists(uint _id) {
        require(postIndex[_id].timePosted > 0, "Non-Existent post");
        _;
    }

    constructor(address _rexHotToken, address _treasury) {
        rexHotToken = IERC20(_rexHotToken);
        treasury = _treasury;
    }

    function register() public notUser(msg.sender) {
        User storage u = userIndex[userId];
        u.user = msg.sender;
        u.id = userId;
        u.status = 1;
        userProf[msg.sender] = userId;
        userId++;
    }

    function createPost(string memory _content) external validUser(msg.sender) {
        Post storage p = postIndex[postId];
        p.poster = msg.sender;
        p.content = _content;
        p.timePosted = block.timestamp;
        p.id = postId;
        userIndex[userProf[msg.sender]].posts.push(p);
        emit NewPost(postId, msg.sender, block.timestamp);
        postId++;
    }

    function getUserPosts(
        address _user
    ) public view validUser(_user) returns (Post[] memory) {
        return userIndex[userProf[_user]].posts;
    }

    function getUser(
        address _user
    ) public view validUser(_user) returns (User memory u) {
        u.user = userIndex[userProf[_user]].user;
        u.totalTips = userIndex[userProf[_user]].totalTips;
        u.posts = userIndex[userProf[_user]].posts;
    }

    function getPost(uint _postId) public view returns (Post memory) {
        return postIndex[_postId];
    }

    //returns details about posts given the starting and ending indexes
    function getPosts(
        uint _start,
        uint _end
    ) public view returns (Post[] memory p) {
        require(
            _end > _start,
            "Fetch:ending index cannot be less than or equal to starting index"
        );
        uint totalLength = _end - _start;
        p = new Post[](totalLength);
        for (uint i; i < totalLength; i++) {
            if (postIndex[_start + i].timePosted != 0) {
                p[i] = getPost(_start + i);
            }
        }
    }

    //burn tokens while tipping
    function _tipUser(
        address _user,
        uint _amount
    ) internal validUser(msg.sender) validUser(_user) returns (bool) {
        require(msg.sender != _user, "can't tip yourself!");
        uint toSend = _amount - ((burnFee * _amount) / 100);
        uint toTreasury = _amount - toSend;
        userIndex[userProf[msg.sender]].totalTips += _amount;
        require(rexHotToken.transferFrom(msg.sender, treasury, toTreasury));
        require(rexHotToken.transferFrom(msg.sender, _user, toSend));
        emit Tipped(msg.sender, _user, _amount);
        return true;
    }

    function tipOnPost(
        address _dst,
        uint _amount,
        uint _postId
    ) public postExists(_postId) {
        require(_tipUser(_dst, _amount));
        postIndex[_postId].tips += _amount;
    }
}
