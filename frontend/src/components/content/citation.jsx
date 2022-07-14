import {FormControl, InputLabel, Select, MenuItem, Grid, Tooltip, Button, 
	TextField, Dialog, DialogActions, DialogContent, DialogContentText, 
	DialogTitle} from "@mui/material"
import React, { useState, useEffect } from "react"
	
import articlecardStyles from '../../styles/components/articlecard.module.css'
import {toAuthorString, toMonthName} from "../../functions/main"
import VerifiedAxiosInstance from '../auth/authenticatedentrypoint'
import LoadingSpinner from "../skeleton/LoadingSpinner"

export default function Citation(props) {

	const [open, setOpen] = useState(false);
	const [citationMethod, setCitationMethod] = useState("apa")
	const [citationResult, setCitationResult] = useState("")
	const [copied, setCopied] = useState(false)

	const [gscholardata, setGscholardata] = useState({})
	const [gscholarload, setGscholarload] = useState(false)

	const title = props.title
	const publisher = props.publisher 
	const url = props.url
	const publish_date = props.publish_date
	const year_accessed = new Date().getFullYear()
	const month_accessed = new Date().getMonth() + 1
	const day_accessed =  new Date().getDate()

	const authors = Object.keys(gscholardata).length !== 0 ? gscholardata['author'].join(" | ") : null

	console.log("publisher is: " + publisher)
	console.log("authors is: " + authors)
	console.log("url is: " + url)
	console.log("publish_date is: " + publish_date)
	console.log("year_accessed is: " + year_accessed)
	console.log("month_accessed is: " + month_accessed)
	console.log("day_accessed is: " + day_accessed)

  
	const handleClickOpen = async (e) => {
		setOpen(true);
		setGscholarload(true)
		await VerifiedAxiosInstance.get('research/researchgscholar/', {
			params: {
			query: title,
			}
		}).then(
			response => {
			var gscholar_dat = response.data
			gscholar_dat['title'] = title
			setGscholardata(gscholar_dat)
			}
		).catch(
			err => {
			console.log("Returned error code of " + err)
			}
		)
		setGscholarload(false)
		console.log("getting g scholar data")
		}

  
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
			
		<Grid> 
			<Dialog open={open} onClose={handleClose}>
			<DialogTitle style={{ fontSize: '2vw', fontWeight: 'bold', color: 'black' }}>
			Citation Tool
			</DialogTitle>
			
			{gscholarload 
			?
			<Grid container justifyContent="center" padding={15}> 
				<LoadingSpinner/>	
			</Grid>
			:	
			
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
			}

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


		</Grid>
	)
}