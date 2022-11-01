import React from "react";
import {IDCard} from "../Utils/Api";

export const Card = ({
    name: {first, last},
    location: {city, state, street, postcode, country},
    email,
    phone,
    dob: {date},
    picture: {medium},
    login: {uuid},
    updateCard}: IDCard & {
    updateCard: (uuid: string, key: string, value: string) => void;
}) => {
    // const [firstName, setFirstName] = React.useState(first);
    return (
        <div className="card-container">
            <img className="round" src={medium} alt="user"/>
            <h3>{`${first} ${last}`}</h3>
            <h6>{date}</h6>
            <p>{email}</p>
            <p>{email}</p>
            <InlineEdit value={email} setValue={(e: string) => {
                updateCard(uuid, 'email', e);
            }} />
            <p>{phone}</p>
            <div className="address-wrapper">
                <h6 style={{textAlign: 'center'}}>Address</h6>
                <div className={"address-items"}>
                    <div className={"address-item"}>
                        <p>Street</p>
                        <p>{`${street.number} ${street.name}`}</p>
                    </div>
                    <div className={"address-item"}>
                        <p>City</p>
                        <p>{city}</p>
                    </div>
                    <div className={"address-item"}>
                        <p>State</p>
                        <p>{state}</p>
                    </div>
                    <div className={"address-item"}>
                        <p>Postal Code</p>
                        <p>{postcode}</p>
                    </div>
                    <div className={"address-item"}>
                        <p>Country</p>
                        <p>{country}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


// @ts-ignore
export const InlineEdit = ({ value, setValue }) => {
    const [editingValue, setEditingValue] = React.useState(value);

    const onChange = (event: { target: { value: any; }; }) => setEditingValue(event.target.value);

    const onKeyDown = (event: { key: string; target: { blur: () => void; }; }) => {
        if (event.key === "Enter" || event.key === "Escape") {
            event.target.blur();
        }
    };

    const onBlur = (event: { target: { value: string; }; }) => {
        if (event.target.value.trim() === "") {
            setEditingValue(value);
        } else {
            setValue(event.target.value);
        }
    };

    return (
        <input
            type="text"
            aria-label="Field name"
            value={editingValue}
            onChange={onChange}
            // @ts-ignore
            onKeyDown={onKeyDown}
            onBlur={onBlur}
        />
    );
};