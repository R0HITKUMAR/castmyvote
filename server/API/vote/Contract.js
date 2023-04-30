let contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_electionid",
        type: "string",
      },
      {
        internalType: "string",
        name: "_electionname",
        type: "string",
      },
      {
        internalType: "string",
        name: "_candidateid",
        type: "string",
      },
      {
        internalType: "string",
        name: "_timestamp",
        type: "string",
      },
    ],
    name: "addVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Users",
    outputs: [
      {
        internalType: "string",
        name: "election_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "election_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "candidate_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "timestamp",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let contractAddress = "0xD2378B8c318456B14Fa1575DC502b5c5CEa45A48";

export { contractABI, contractAddress };
