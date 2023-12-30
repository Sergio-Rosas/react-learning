import {useState} from "react";

const initialFriends = [{
    id: 118836, name: "Clark", image: "https://i.pravatar.cc/48?u=118836", balance: -7,
}, {
    id: 933372, name: "Sarah", image: "https://i.pravatar.cc/48?u=933372", balance: 20,
}, {
    id: 499476, name: "Anthony", image: "https://i.pravatar.cc/48?u=499476", balance: 0,
},];

export default function App() {
    const [addFriendForm, setAddFriendForm] = useState(false);
    const [friendName, setFriendName] = useState("");
    const [imageURL, setImageURL] = useState("https://i.pravatar.cc/48");
    {/* Put the friends array back to empty*/
    }
    const [friendsArray, setFriendsArray] = useState(initialFriends);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleFriendForm() {
        setAddFriendForm(!addFriendForm)
        setSelectedFriend(null);
    }

    function handleSetFriendName(e) {
        setFriendName(e.target.value);
    }

    function handleImageURL(e) {
        setImageURL(e.target.value);
    }

    function addFriend(e, name, image) {
        e.preventDefault();
        if (!name) return

        const id = Math.round(Math.random() * 1_000_000);
        const friend = {id: id, name: name, image: image, balance: 0};

        setFriendsArray((fArray) => [...fArray, friend]);

        handleFriendForm();
        (() => setFriendName(""))();
        (() => setImageURL(`https://i.pravatar.cc/48?u=${friend.id}`))();
    }

    function updateFriend(value) {
        setFriendsArray((friends) => friends.map((friend) => selectedFriend.id === friend.id ? {
            ...friend,
            balance: friend.balance + Number(value.toFixed(2))
        } : friend))

        setSelectedFriend(null);
    }

    function handleSelection(friend) {
        setSelectedFriend((cur) => cur?.id === friend.id ? null : friend);
        setAddFriendForm(false);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList friendsArray={friendsArray} onHandleSelection={handleSelection}
                             selectedFriend={selectedFriend}/>
                {addFriendForm ?
                    <FormAddFriend friendName={friendName} imageURL={imageURL} onSetFriendName={handleSetFriendName}
                                   onSetImageURL={handleImageURL} onSetFriendArray={addFriend}/> : ""}
                <Button handleOnClick={handleFriendForm}>{addFriendForm ? "Close" : "Add friend"}</Button>
            </div>
            {selectedFriend ? <FormSplitBill selectedFriend={selectedFriend} onUpdateFriend={updateFriend}
                                             key={selectedFriend.id}/> : ""}
        </div>)
}

function Button({children, handleOnClick}) {
    return <button className="button" onClick={handleOnClick}>{children}</button>
}

function FriendsList({friendsArray, onHandleSelection, selectedFriend}) {
    //const friends = initialFriends;
    return <ul>{friendsArray.map((friend) => <Friend key={friend.id} selectedFriend={selectedFriend} friend={friend}
                                                     onHandleSelection={onHandleSelection}/>)}</ul>
}

function Friend({friend, onHandleSelection, selectedFriend}) {
    const isSelected = selectedFriend?.id === friend.id;

    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name}/>
            <h3>{friend.name}</h3>
            {friend.balance < 0 ? (
                <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>) : friend.balance > 0 ?
                <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p> :
                <p>You and {friend.name} are even</p>}

            <Button
                handleOnClick={() => onHandleSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
        </li>)
}

function FormAddFriend({friendName, imageURL, onSetFriendName, onSetImageURL, onSetFriendArray}) {

    return (<form action="" className="form-add-friend">
        <label htmlFor="name">👫 Friend name</label>
        <input type="text" id="name" value={friendName} onChange={onSetFriendName}/>

        <label htmlFor="image">🌆 Image URL</label>
        <input type="url" id="image" value={imageURL} onChange={onSetImageURL}/>

        <Button handleOnClick={(e) => onSetFriendArray(e, friendName, imageURL)}>Add</Button>
    </form>)
}

function FormSplitBill({selectedFriend, onUpdateFriend}) {
    const [billValue, setBillValue] = useState("");
    const [ownExpense, setOwnExpense] = useState("");
    const [whoPays, setWhoPays] = useState("user");

    const friendExpense = Number((Number(billValue) - Number(ownExpense)).toFixed(2))

    function handleBill(e) {
        setBillValue(e.target.value);
    }

    function handleExpense(e) {
        setOwnExpense(Number(e.target.value) > billValue ? ownExpense : e.target.value);
    }

    function handleWhoPays(e) {
        setWhoPays(e.target.value);
    }

    function splitBill(e) {
        e.preventDefault();

        if (!billValue || !ownExpense) return;

        onUpdateFriend(whoPays === "user" ? friendExpense : friendExpense * -1);
    }

    return (
        <form action="" className="form-split-bill" onSubmit={splitBill}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>💰 Bill value</label>
            <input type="number" value={billValue} onChange={handleBill}/>

            <label>🧍 Your expense</label>
            <input type="number" value={ownExpense} onChange={handleExpense}/>

            <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense:</label>
            <input type="number" value={friendExpense} disabled/>

            <label>🤑 Who is paying the bill?</label>
            <select value={whoPays} onChange={handleWhoPays}>
                <option value="user">You</option>
                <option value={selectedFriend.id}>{selectedFriend.name}</option>
            </select>

            <Button>Split bill</Button>
        </form>
    )
}