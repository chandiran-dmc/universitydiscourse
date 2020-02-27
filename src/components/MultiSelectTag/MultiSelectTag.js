// import React, { Component } from "react";
// import { FormControl, FormGroup, FormLabel } from "material-ui";
// import { withStyles } from "material-ui/styles";
// import TextField from "material-ui/TextField";
// import Paper from "material-ui/Paper";
// import { MenuItem } from "material-ui/Menu";
// import Downshift from "downshift";
// import Chip from "material-ui/Chip";
// import CancelIcon from "material-ui/icons/Cancel";
// import MultiChipSelect from "./MultiChipSelect";

// const styles = theme => ({
//   chipContainer: {
//     backgroundColor: "transparent",
//     display: "inline-block",
//     marginBottom: 10
//   },
//   chip: {
//     marginTop: 10,
//     marginRight: 5
//   },
//   paper: {
//     maxHeight: "150px",
//     overflowY: "auto"
//   }
// });
// const allTags = [
//   'cs252',
//   'cs250',
//   'cs180',
// ];

// export default class MultiSelectTag extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tags: this.allTags,
//       selectedTag: []
//     };
//   };

//     handleChange = selectedTag => {
//       if (this.state.selectedTag.includes(selectedTag)) {
//         this.removeSelectedTag(selectedTag);
//       } else {
//         this.addSelectedTag(selectedTag);
//       }
//     };

//     addSelectedTag(tag) {
//       this.setState(({ selectedTag, tags }) => ({
//         inputValue: "",
//         selectedTag: [...selectedTag, tag],
//         tags: tags.filter(i => i.name !== tag)
//       }));
//     };

//     removeSelectedTag = tag => {
//       this.setState(({ selectedTag, tags }) => ({
//         inputValue: "",
//         selectedTag: selectedTag.filter(i => i !== tag),
//         tagss: [...tags, { name: tag, id: tag.toLowerCase() }]
//       }));
//     };

//     handleChangeInput = inputVal => {
//       const t = inputVal.split(",");
//       if (JSON.stringify(t) !== JSON.stringify(this.state.selectedTag)) {
//         this.setState({ inputValue: inputVal });
//       }
//     };

//     render() {
//       const { selectedTag, tags } = this.state;
//       return (
//         <FormGroup>
//           <FormControl>
//             <FormLabel>Select the relevant Tags</FormLabel>
//             <MultiChipSelect
//               onInputValueChange={this.handleChangeInput}
//               inputValue={this.state.inputValue}
//               availableTags={tags}
//               selectedTag={selectedTag}
//               onChange={this.handleChange}
//               onRemoveTag={this.removeSelectedTag}
//             />
//           </FormControl>
//         </FormGroup>
//       );

//     }
     
    
  


  






// }



// // allItems = starWarsNames
// //     .random(7)
// //     .map(s => ({ name: s, id: s.toLowerCase() }));
// //   state = {
// //     items: this.allItems,
// //     selectedItem: []
// //   };

// //   handleChange = selectedItem => {
// //     if (this.state.selectedItem.includes(selectedItem)) {
// //       this.removeSelectedItem(selectedItem);
// //     } else {
// //       this.addSelectedItem(selectedItem);
// //     }
// //   };

// //   addSelectedItem(item) {
// //     this.setState(({ selectedItem, items }) => ({
// //       inputValue: "",
// //       selectedItem: [...selectedItem, item],
// //       items: items.filter(i => i.name !== item)
// //     }));
// //   }

// //   removeSelectedItem = item => {
// //     this.setState(({ selectedItem, items }) => ({
// //       inputValue: "",
// //       selectedItem: selectedItem.filter(i => i !== item),
// //       items: [...items, { name: item, id: item.toLowerCase() }]
// //     }));
// //   };

// //   handleChangeInput = inputVal => {
// //     const t = inputVal.split(",");
// //     if (JSON.stringify(t) !== JSON.stringify(this.state.selectedItem)) {
// //       this.setState({ inputValue: inputVal });
// //     }
// //   };

// // const styles = theme => ({
// //   chipContainer: {
// //     backgroundColor: "transparent",
// //     display: "inline-block",
// //     marginBottom: 10
// //   },
// //   chip: {
// //     marginTop: 10,
// //     marginRight: 5
// //   },
// //   paper: {
// //     maxHeight: "150px",
// //     overflowY: "auto"
// //   }
// // });

// // const renderInput = inputProps => {
// //   const { InputProps, classes, availableItems } = inputProps;

// //   const allItemSelected = availableItems.length === 0;

// //   return (
// //     <TextField
// //       fullWidth
// //       label={
// //         allItemSelected ? "No more character to add" : "Choose a character"
// //       }
// //       disabled={allItemSelected}
// //       InputProps={{
// //         classes: {
// //           input: classes.input
// //         },
// //         ...InputProps
// //       }}
// //     />
// //   );
// // };

// // const renderChipList = inputProps => {
// //   const { classes, selectedItem, onRemoveItem } = inputProps;
// //   return (
// //     <div className={classes.chipContainer}>
// //       {selectedItem.length > 0 &&
// //         selectedItem.map(item => (
// //           <Chip
// //             key={item}
// //             className={classes.chip}
// //             label={item}
// //             deleteIcon={<CancelIcon />}
// //             onDelete={() => onRemoveItem(item)}
// //             onClick={() => onRemoveItem(item)}
// //           />
// //         ))}
// //     </div>
// //   );
// // };

// // const renderSuggestion = params => {
// //   const { item, index, itemProps, highlightedIndex, selectedItem } = params;
// //   const isHighlighted = highlightedIndex === index;
// //   const isSelected = selectedItem.indexOf(item.name) > -1;

// //   return (
// //     !isSelected && (
// //       <MenuItem
// //         {...itemProps}
// //         key={item.id}
// //         selected={isHighlighted}
// //         component="div"
// //       >
// //         {item.name}
// //       </MenuItem>
// //     )
// //   );
// // };

// // const getSuggestions = (inputValue, itemList) =>
// //   itemList.filter(item =>
// //     item.name.toLowerCase().includes(inputValue.toLowerCase())
// //   );

// // function MultiChipSelect(props) {
// //   const { classes, availableItems, onRemoveItem, ...rest } = props;

// //   return (
// //     <Downshift {...rest}>
// //       {({
// //         getInputProps,
// //         getItemProps,
// //         inputValue,
// //         selectedItem,
// //         highlightedIndex,
// //         toggleMenu,
// //         isOpen
// //       }) => (
// //         <div>
// //           {renderChipList({
// //             classes,
// //             onRemoveItem,
// //             selectedItem
// //           })}

// //           {renderInput({
// //             classes,
// //             selectedItem,
// //             availableItems,
// //             InputProps: {
// //               ...getInputProps({
// //                 onClick: () => toggleMenu()
// //               })
// //             }
// //           })}

// //           {isOpen && (
// //             <Paper className={classes.paper} square>
// //               {getSuggestions(inputValue, availableItems).map((item, index) =>
// //                 renderSuggestion({
// //                   item,
// //                   index,
// //                   itemProps: getItemProps({
// //                     item: item.name
// //                   }),
// //                   highlightedIndex,
// //                   selectedItem
// //                 })
// //               )}
// //             </Paper>
// //           )}
// //         </div>
// //       )}
// //     </Downshift>
// //   );
// // }

// // export default withStyles(styles)(MultiChipSelect);