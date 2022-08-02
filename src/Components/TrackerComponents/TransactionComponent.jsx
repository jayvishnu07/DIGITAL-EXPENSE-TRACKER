import React, { useCallback, useRef } from 'react'
import { useState, useEffect } from 'react';
import styled from "styled-components";
import { PDFExport } from "@progress/kendo-react-pdf";

import { database } from '../../misc/Firebase';

import { useProfile } from '../../ContextApi/profile.context';


const Container = styled.div`
display: flex;
flex-direction: column;
align-items:flex-start;
padding: 10px 22px;
font-size: 18px;
width: 360px;
gap: 10px;
font-weight: bold;
& input{
  padding:10px 12px;
  border-radius: 12px;
  background: #e6e8e9;
  border: 1px solid #e6e8e9;
  outline: none;
  width: 20rem;
}
`;

const PdfButton = styled.button`
background:black;
color:white;
padding: 5px 10px;
border-radius: 4px;
cursor:pointer;
font-weight:bold;
font-size:15px;
margin-left: 6rem;
`;
const TitleAndPdfWrapper = styled.div`
display: flex;
align-items: center;

`;



const Cell = styled.div`  
  background-color: white;
  width: 20rem;
  color: #0d1d2c;
  padding: 10px 15px;
  margin: 10px 0 10px 0;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  cursor: pointer;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")}; 
  &:hover{
  -webkit-transform: scale(0.9);
  -ms-transform: scale(1);
  transform: scale(1.03);
  transition: .2s ease-in-out;
  } 
  &:active{
  transform: scale(.99);
  transition: none;

  } 
  `;
const TnxDetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;

 
  `;

const AddTnxDetailWrapper = styled.div`
  display: block;
  `;

const DeleteButton = styled.button`
  display: block;
  background:black;
  color:white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor:pointer;
  font-weight:bold;
  font-size:12px;
  margin: auto;
`;

const TransactionComponent = (props) => {

  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  const TransactionCell = (props) => {
    const [isCellClicked, setIsCellClicked] = useState(false);

    const cellClickHandler = () => {
      setIsCellClicked(!isCellClicked);
    }


    const date = new Date(props.item.timeStamp)
    // console.log(date.toDateString(), date.toTimeString());

    const { profile } = useProfile();

    const handleDelete = (obj) => {
      console.log("delete clicked");


      database.ref(`/profiles/${profile.uid}/values/${obj}`).remove()


      console.log("delete clicked - obj", obj);
      console.log("delete clicked -  props.item.id", props.item.id);


    }


    return (
      <Cell key={props.index} onClick={cellClickHandler} isExpense={props.item?.type === "EXPENSE"}>
        <TnxDetailWrapper>
          <span>{props.item?.desc}</span>
          <span>${props.item?.amount}</span>
        </TnxDetailWrapper>

        {isCellClicked && <AddTnxDetailWrapper  >
        <br />
          <hr />
          <br />
          <span> Date : {date ? date.toDateString() : "Date not found"}</span><br /><br />
          <span> Time : {date ? date.toTimeString() : "Time not found"}</span>
          <DeleteButton onClick={() => { handleDelete(props.item.id) }}>Delete</DeleteButton>
        </AddTnxDetailWrapper>}
      </Cell>
    );

  };


  const filterData = useCallback((searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim()),
    );
    updateTxn(txn);
  });

  useEffect(() => {
    filterData(searchText);
  }, [props.transactions, searchText, filterData]);

  const handleExportWithComponent = (event) => {
    pdfExportComponents.current.save();

  }
  const pdfExportComponents = useRef(null);


  return (
    <Container>
      <TitleAndPdfWrapper>
        <span>Transactions</span>
        <PdfButton onClick={handleExportWithComponent}>Export PDF</PdfButton>
      </TitleAndPdfWrapper>
      <input
        placeholder="Search"
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      <PDFExport ref={pdfExportComponents} paperSize="A4" >
        {filteredTransaction?.map((item, index) => (
          <TransactionCell key={index} item={item} />
        ))}
      </PDFExport>
    </Container>

  )

};


export default TransactionComponent;