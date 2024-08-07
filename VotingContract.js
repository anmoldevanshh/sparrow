import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
const contractABI = [ /* ABI array from compilation */ ];
const contractAddress = '0xYourContractAddress';

const votingContract = new web3.eth.Contract(contractABI, contractAddress);

export default votingContract;
