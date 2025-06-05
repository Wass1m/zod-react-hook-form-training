import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import YupForm from "../YupForm";
import ReRendering from "../ReRendering";
import ZodForm from "../ZodForm";
import DecompositionForm from "../Decomposition";
import ExhaustiveDepsForm from "../ExhaustiveDeps";

const drawerWidth = 240;

const sections = [
  "Yup",
  "Zod",
  "Re Rendering",
  "Decomposition",
  "ExhaustiveDeps",
];

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const renderContent = () => {
    switch (sections[selectedIndex]) {
      case "Yup":
        return <YupForm key={sections[selectedIndex]} />;
      case "Zod":
        return <ZodForm />;
      case "Re Rendering":
        return <ReRendering />;
      case "Decomposition":
        return <DecompositionForm />;
      case "ExhaustiveDeps":
        return <ExhaustiveDepsForm />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#317156",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ASK Concepts
          </Typography>
        </Box>
        <List>
          {sections.map((text, index) => (
            <ListItemButton
              key={text}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                color: selectedIndex === index ? "#317156" : "#c9d1d9",
                backgroundColor:
                  selectedIndex === index ? "white !important" : "transparent",
                "&:hover": {
                  backgroundColor: "#23863644",
                },
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          p: 3,
          minHeight: "100vh",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Home;
