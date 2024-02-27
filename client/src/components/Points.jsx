import React, { useState, useEffect } from "react";

export default function Points() {
    var contract, accounts, address;
    
    const [userAddress, setUserAddress] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [eventMessage, setEventMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artifact = require("../contracts/Points.json");
                const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
                accounts = await web3.eth.requestAccounts();
                const networkID = await web3.eth.net.getId();
                const { abi } = artifact;
                address = artifact.networks[networkID].address;
                contract = new web3.eth.Contract(abi, address);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    });

    const getOwner = async () => {
        try {
            const result = await contract.methods.GetOwner().call();
            console.log("Contract owner:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getCurrentUser = async () => {
        try {
            const result = await contract.methods.GetCurrentUser().call({
                from: accounts[0],
            });
            console.log("Current user:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getUserPoints = async () => {
        try {
            const result = await contract.methods.GetUserPoints().call({
                from: accounts[0],
            });
            console.log("Current user points:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getOthersPoints = async () => {
        try {
            const result = await contract.methods.GetOthersPoints(userAddress).call();
            console.log("Other User Points:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const addPoints = async () => {
        try {
            const result = await contract.methods.AddPoints(receiverAddress).send({
                from: accounts[0],
            });
            console.log("Add points:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const removePoints = async () => {
        try {
            await contract.methods.RemovePoints(receiverAddress).send({
                from: accounts[0],
            });
            getEmit();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getEmit = async () => {
        contract.events.PointsNotUpdated({}, (error, event) => {
            if (error) {
              console.error("Event error:", error);
            } else {
              setEventMessage(event.returnValues.message);
              console.log("Event Message:",event.returnValues.message);
            }
        });
    }

    return (
        <div>
            <button onClick={getOwner}>Get Owner</button>
            <button onClick={getCurrentUser}>Get CurrentUser</button>
            <input type="button" value="Get User Points" onClick={getUserPoints} />
            <div>
                <input
                    type="text"
                    placeholder="Enter user address"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                />
                <input type="button" value="Get Others Points" onClick={getOthersPoints} />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter receiver address"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                />
                <input type="button" value="Add points" onClick={addPoints} />
                <input type="button" value="Remove points" onClick={removePoints} />
            </div>
            <p>Event Message: {eventMessage}</p>
        </div>
    );
}
