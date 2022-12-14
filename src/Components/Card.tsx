import React from "react";
import {IDCard} from "../Utils/Api";
import {InlineInputEdit} from "react-inline-input-edit";

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
    return (
        <div className="card-container some-bananas">
            <img className="round" src={medium} alt="user"/>
            <div>
                <InlineInputEdit text={first} onFocusOut={e => updateCard(uuid, 'name.first', e)} labelClassName={'inline-h3'} /> <InlineInputEdit text={last} onFocusOut={e => updateCard(uuid, 'name.last', e)} labelClassName={'inline-h3'} />
            </div>
            <InlineInputEdit
                text={new Date(date).toLocaleDateString('en-US')}
                labelClassName={'inline-p'}
                onFocusOut={e => updateCard(uuid, 'dob.date', e)} /><br/>
            <InlineInputEdit
                labelClassName={'inline-p'}
                text={email}
                onFocusOut={e => updateCard(uuid, 'email', e)} /><br/>
            <InlineInputEdit
                text={phone}
                labelClassName={'inline-p'}
                onFocusOut={e => updateCard(uuid, 'phone', e)}
            />
            <div className="address-wrapper">
                <h6 style={{textAlign: 'center'}}>Address</h6>
                <div className={"address-items"}>
                    <div className={"address-item"}>
                        <p>House/App Number</p>
                        <InlineInputEdit
                            text={String(street.number)}
                            onFocusOut={e => updateCard(uuid, 'location.street.number', e)}
                            labelClassName={'address-item'}
                        />
                    </div>
                    <div className={"address-item"}>
                        <p>Street Name</p>
                        <InlineInputEdit
                            text={street.name}
                            onFocusOut={e => updateCard(uuid,'location.street.name', e)}
                            labelClassName={'address-item'}
                        />
                    </div>
                    <div className={"address-item"}>
                        <p>City</p>
                        <InlineInputEdit
                            text={city}
                            onFocusOut={e => updateCard(uuid, 'location.city', e)}
                            labelClassName={'address-item'}
                        />
                    </div>
                    <div className={"address-item"}>
                        <p>State</p>
                        <InlineInputEdit
                            text={state}
                            onFocusOut={e => updateCard(uuid, 'location.state', e)}
                            labelClassName={'address-item'}
                        />
                    </div>
                    <div className={"address-item"}>
                        <p>Postal Code</p>
                        <InlineInputEdit
                            text={String(postcode)}
                            onFocusOut={e => updateCard(uuid, 'location.postcode', e)}
                            labelClassName={'address-item'}
                        />
                    </div>
                    <div className={"address-item"}>
                        <p>Country</p>
                        <InlineInputEdit
                            text={country}
                            onFocusOut={e => updateCard(uuid, 'location.country', e)}
                            labelClassName={'address-item'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
