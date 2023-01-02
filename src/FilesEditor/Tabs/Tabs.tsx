import { Cancel } from "@mui/icons-material";
import { Stack, Paper, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useSharedState } from "../../Contexts/SharedStateContext";
import _ from 'lodash'
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
//NOTE: Look into using tabs from MUI

export const Tabs = () => {
  const { fileInFocus, setFileContentsRef, fileContentsRef, setFileInFocus, fileTouched, setFileTouched } = useSharedState()

  const getFileName = (name: string) => {
    const match = name.match(/([^/]+)\.(\w+)(?:\.(\w+))?$/g);
    if (!match) return "";
    return match[0];
  };

  const handleSave = async (e: KeyboardEvent) => {
    if (e.key === 's' && e.metaKey) {
      await writeTextFile(fileInFocus, fileContentsRef, { dir: BaseDirectory.Home })
      setFileTouched(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleSave)

    return () => document.removeEventListener('keyup', handleSave)
  }, [])

  return (
    <Stack direction={"row"} flex={0.5}>
      {!!fileInFocus && <Paper
        sx={{ p: 1, display: "flex", gap: 0.5, alignItems: "center", backgroundColor: '#2b2b2b', borderRadius: '0' }}
        elevation={1}
      >
        {fileTouched && <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'red' }} />}
        <Typography>{getFileName(fileInFocus)}</Typography>
        <Cancel
          onClick={() => {
            setFileContentsRef("");
            setFileInFocus("");
          }}
          sx={{ fontSize: 16, cursor: 'pointer' }}
        />

      </Paper>}
    </Stack>
  );
};
