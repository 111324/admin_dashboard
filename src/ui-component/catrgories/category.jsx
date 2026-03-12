import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getEventTypesRequest,
  createEventTypeRequest
} from "../../container/categoryContainer/slice";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CategoryIcon from "@mui/icons-material/Category";

export default function Categories() {

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getEventTypesRequest());
  }, [dispatch]);

  const handleCreate = () => {
    if (!name) return;

    dispatch(createEventTypeRequest(name));
    setName("");
    setOpen(false);
  };

  return (
    <Box
      sx={{
        padding: "30px",
        minHeight: "100vh",
        
        color: "#fff"
      }}
    >

      {/* HEADER */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >

        <Box>
          <Typography
            variant="h4"
            fontSize={"20px"}
            fontWeight="bold"
           
          >
            Event Categories
          </Typography>

          <Typography sx={{ color: "#9ca3af", fontSize: "13px" }}>
            {categories.length} categories created
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
            padding: "8px 18px",
            fontSize: "13px",
            boxShadow: "0 4px 14px rgba(249,115,22,0.35)"
          }}
          onClick={() => setOpen(true)}
        >
          + Add Category
        </Button>

      </Box>


      {/* CATEGORY GRID */}

      <Grid container spacing={2}>

        {categories.map((cat) => (

          <Grid item xs={12} sm={6} md={3} key={cat._id}>

            <Card
              sx={{
                background: "#121821",
                backdropFilter: "blur(8px)",
                borderRadius: "14px",
                padding: "6px",
                border: "1px solid rgba(249,115,22,0.15)",
                transition: "all 0.3s",
                "&:hover": {
                  border: "1px solid #f97316",
                  transform: "translateY(-3px)"
                }
              }}
            >

              <CardContent sx={{ padding: "12px !important" }}>

                {/* TOP */}

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >

                  <Box
                    sx={{
                      background: "linear-gradient(135deg,#f97316,#ea580c)",
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <CategoryIcon sx={{ color: "#fff", fontSize: 18 }} />
                  </Box>

                  <Chip
                    label="Active"
                    size="small"
                    sx={{
                      background: "rgba(16,185,129,0.15)",
                      color: "#10b981",
                      fontWeight: "bold",
                      fontSize: "10px",
                      height: "22px"
                    }}
                  />

                </Box>

                {/* NAME */}

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ fontSize: "15px" }}
                >
                  {cat.name?.replace(/\b\w/g, (c) => c.toUpperCase())}
                </Typography>

                {/* DESCRIPTION */}

                <Typography
                  variant="body2"
                  sx={{
                    color: "#9ca3af",
                    fontSize: "12px",
                    mb: 1
                  }}
                >
                  Event category
                </Typography>

                {/* FOOTER */}

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >

                  <Typography
                    variant="caption"
                    sx={{ color: "#6b7280", fontSize: "10px" }}
                  >
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </Typography>


                </Box>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>


      {/* ADD CATEGORY MODAL */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: "#111827",
            borderRadius: "14px",
            border: "1px solid rgba(249,115,22,0.25)",
            color: "#fff"
          }
        }}
      >

        <DialogTitle sx={{ color: "#ff7a00",fontSize:"15px", fontWeight: "bold" }}>
          Add Category
        </DialogTitle>

        <DialogContent>

          <TextField
            label="Category Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mt: 2,
              input: { color: "#fff" },
              label: { color: "#9ca3af" }
            }}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpen(false)} sx={{ color: "#9ca3af" }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              background: "linear-gradient(135deg,#f97316,#ea580c)",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold"
            }}
          >
            Create
          </Button>

        </DialogActions>

      </Dialog>

    </Box>
  );
}