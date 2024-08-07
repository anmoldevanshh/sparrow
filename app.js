document.addEventListener('DOMContentLoaded', () => {
    const addCandidateForm = document.getElementById('add-candidate-form');
    const candidateNameInput = document.getElementById('candidate-name');
    const candidateSelect = document.getElementById('candidate-select');
    const voteButton = document.getElementById('vote-button');
    const candidateListUL = document.getElementById('candidate-list-ul');
    const connectWalletButton = document.getElementById('connect-wallet-button');
    const walletAddressDisplay = document.getElementById('wallet-address');

    let web3;
    let votingContract;
    let userAccount;

    async function initWeb3() {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("User denied account access");
            }
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        } else {
            console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
        }

        const contractABI = [ /* ABI array from compilation */ ];
        const contractAddress = '0xYourContractAddress';
        votingContract = new web3.eth.Contract(contractABI, contractAddress);
    }

    async function fetchCandidates() {
        const count = await votingContract.methods.candidatesCount().call();
        candidateSelect.innerHTML = '<option value="">Select Candidate</option>';
        candidateListUL.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            const candidate = await votingContract.methods.getCandidate(i).call();
            const option = document.createElement('option');
            option.value = i;
            option.textContent = candidate[0];
            candidateSelect.appendChild(option);

            const li = document.createElement('li');
            li.textContent = `${candidate[0]} - ${candidate[1]} votes`;
            candidateListUL.appendChild(li);
        }
    }

    addCandidateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await votingContract.methods.addCandidate(candidateNameInput.value).send({ from: userAccount });
        candidateNameInput.value = '';
        fetchCandidates();
    });

    candidateSelect.addEventListener('change', () => {
        voteButton.disabled = !candidateSelect.value;
    });

    voteButton.addEventListener('click', async () => {
        await votingContract.methods.vote(candidateSelect.value).send({ from: userAccount });
        fetchCandidates();
    });

    connectWalletButton.addEventListener('click', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        walletAddressDisplay.textContent = `Connected wallet: ${userAccount}`;
        fetchCandidates();
    });

    initWeb3();
});
