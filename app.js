document.addEventListener('DOMContentLoaded', () => {
    const addCandidateForm = document.getElementById('add-candidate-form');
    const candidateNameInput = document.getElementById('candidate-name');
    const candidateSelect = document.getElementById('candidate-select');
    const voteButton = document.getElementById('vote-button');
    const candidateListUL = document.getElementById('candidate-list-ul');

    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const contractABI = [ /* ABI array from compilation */ ];
    const contractAddress = '0xYourContractAddress';
    const votingContract = new web3.eth.Contract(contractABI, contractAddress);

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
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await votingContract.methods.addCandidate(candidateNameInput.value).send({ from: accounts[0] });
        candidateNameInput.value = '';
        fetchCandidates();
    });

    candidateSelect.addEventListener('change', () => {
        voteButton.disabled = !candidateSelect.value;
    });

    voteButton.addEventListener('click', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await votingContract.methods.vote(candidateSelect.value).send({ from: accounts[0] });
        fetchCandidates();
    });

    fetchCandidates();
});
