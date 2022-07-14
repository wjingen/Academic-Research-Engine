import {FormControl, InputLabel, Select, MenuItem, Grid, Tooltip, Button, 
	TextField, Dialog, DialogActions, DialogContent, DialogContentText, 
	DialogTitle} from "@mui/material"
import React, { useState, useEffect } from "react"
	
import articlecardStyles from '../../styles/components/articlecard.module.css'
import {toAuthorString, toMonthName} from "../../functions/main"
import { style } from "@mui/system"

export default function Citation(props) {

	const title = props.title
	// const titleShort = props.titleShort 
	const publisher = props.publisher 
	const authors = props.authors 
	const url = props.url
	const publish_date = props.publish_date
	// const year_issued = props.year_issued 
	// const month_issued = props.month_issued 
	// const day_issued = props.day_issued 
	const year_accessed = new Date().getFullYear()
	const month_accessed = new Date().getMonth() + 1
	const day_accessed =  new Date().getDate() 

	const [open, setOpen] = useState(false);
	const [citationMethod, setCitationMethod] = useState("apa")
	const [citationResult, setCitationResult] = useState("")
	const [copied, setCopied] = useState(false)
  
	const handleClickOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
  
	const handleCitationMethod = (event) => {
		  setCitationMethod(event.target.value);
	}
  
	const handleCopy = () => {
	  if (citationResult) {
		navigator.clipboard.writeText(citationResult)
		setCopied(true)
	  }    
	}
  
	// Toggle duration of popup after copy to clipboard
	useEffect(() => {
	  setTimeout(() => {
		setCopied(false)
	  }, 2000);
	}, [copied]);
  
  
	// useEffect to update citation based on method
	useEffect(() => {
	  if (citationMethod === "apa") {
		// var result = `${toAuthorString(authors)} (${year_issued}, ${toMonthName(month_issued)} ${day_issued}).${title}. ${titleShort}. Retrieved ${toMonthName(month_accessed)} ${day_accessed}, ${year_accessed}, from ${url}.`
		var result = `${authors} (${publish_date}). ${title}. Retrieved ${toMonthName(month_accessed)} ${day_accessed}, ${year_accessed}, from ${url}.`
		setCitationResult(result)
	  } else if (citationMethod === "mla") {
		setCitationResult("mla!") 
	  } else if (citationMethod === "harvard") {
		setCitationResult("harvard!") 
	  } 
	}, [citationMethod])

	return (
		<Grid container>
		<button className={articlecardStyles.readmorebuttonStyle} onClick={handleClickOpen}>
				Cite
		</button>
			<Dialog open={open} onClose={handleClose}>
			<DialogTitle style={{ fontSize: '2vw', fontWeight: 'bold', color: 'black' }}>
			Citation Tool
			</DialogTitle>
			<DialogContent style={{padding:"30px"}} >
			<DialogContentText>
				<FormControl label="Citation" >
				<InputLabel sx={{fontWeight: "bold"}}>
					Citation Style
				</InputLabel>
				<Select 
					value={citationMethod} 
					onChange={handleCitationMethod} 
					label="Citation Style"
					sx={{
						fontWeight: "bold"
					}}
				>
					<MenuItem value={"apa"}>American Psychology Association (APA)</MenuItem>
					<MenuItem value={"mla"}>Modern Language Association (MLA)</MenuItem>
					<MenuItem value={"harvard"}>Harvard</MenuItem>
				</Select>
				</FormControl>
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label="Citation Output"
				type="email"
				variant="standard"
				defaultValue=""
				value={citationResult}
				multiline
				sx={{width: "100%"}}
				InputProps={{
					style: {
						fontWeight: "bold",
					}
				}}
				InputLabelProps={{
					style: {
						fontWeight: "bold"
					}
				}}
				/>
			</DialogContent>
			<DialogActions  style={{"paddingBottom": "10px"}}>
			
			<Tooltip
				open={copied}
				title={"Copied to clipboard!"}
				componentsProps={{
				tooltip: {
					sx: {
					color: "white",
					backgroundColor: "grey",
					fontSize: 18,
					padding: "10px"
					}
				}
				}}
				>
				<Button variant="outlined" onClick={handleCopy} style={{ fontWeight: 'bold', color: 'black', borderColor: 'black' }}>
				Copy to Clipboard
				</Button>
			</Tooltip>
			<Button variant="outlined" onClick={handleClose} style={{ fontWeight: 'bold', color: 'black', borderColor: 'black' }}>
				Exit
			</Button>
			</DialogActions>
		</Dialog>
		</Grid>
	)
}