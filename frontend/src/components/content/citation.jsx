import {FormControl, InputLabel, Select, MenuItem, Grid, Tooltip, Button, 
	TextField, Dialog, DialogActions, DialogContent, DialogContentText, 
	DialogTitle} from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState, useEffect } from "react"
	
import articlecardStyles from '../../styles/components/articlecard.module.css'
import VerifiedAxiosInstance from '../auth/authenticatedentrypoint'
import LoadingSpinner from "../skeleton/LoadingSpinner"

export default function Citation(props) {

	const [open, setOpen] = useState(false);
	const [citationMethod, setCitationMethod] = useState("APA")
	const [citationResult, setCitationResult] = useState("")
	const [copied, setCopied] = useState(false)

	const [gscholarload, setGscholarload] = useState(false)
	const [citations, setCitations] = useState({})
	const [failed, setFailed] = useState(false)
	const title = props.title
  
	const handleClickOpen = async (e) => {
		setOpen(true);
		setGscholarload(true)
		await VerifiedAxiosInstance.get('research/citationgscholar/', {
			params: {
			query: title,
			}
		}).then(
			response => {
				var data = response.data
				setCitations(data)
			}
		).catch(
			err => {
			console.log("Returned error code of " + err)
			setFailed(true)
			}
		)
		setGscholarload(false)
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
		setCitationResult(citations[citationMethod])
	}, [citationMethod, citations, failed])

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
			//  Loading Spinner
			<Grid container justifyContent="center" padding={15}> 
				<LoadingSpinner/>	
			</Grid>
			:	
			failed
			?
			// If failed = true
			<Grid padding={5}>
				Unable to obtain citation results.
			</Grid>
			:
			// If failed = false
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
					<MenuItem value={"APA"}>American Psychology Association (APA)</MenuItem>
					<MenuItem value={"MLA"}>Modern Language Association (MLA)</MenuItem>
					<MenuItem value={"Chicago"}>Chicago</MenuItem>
					<MenuItem value={"Harvard"}>Harvard</MenuItem>
					<MenuItem value={"Vancouver"}>Vancouver</MenuItem>
				</Select>
				</FormControl>
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				type="email"
				variant="standard"
				defaultValue=""
				value={citationResult}
				multiline
				sx={{width: "100%", minWidth: "400px", paddingTop: 2}}
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
				<LoadingButton 
					variant="outlined" 
					onClick={handleCopy} 
					loading={gscholarload}
					style={{fontWeight: 'bold', color: 'black', borderColor: 'black' }}
					>
				Copy to Clipboard
				</LoadingButton>
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