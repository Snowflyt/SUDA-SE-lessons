// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::{Read, Write};

use tauri::Manager;
use window_shadows::set_shadow;

#[derive(Debug, thiserror::Error)]
enum MyError {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    Json(#[from] serde_json::Error),
}
impl std::fmt::Display for MyError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            MyError::Io(e) => e.fmt(f),
            MyError::Json(e) => e.fmt(f),
        }
    }
}
impl serde::Serialize for MyError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn read_file(pathname: &str) -> Result<String, MyError> {
    let mut file = File::open(pathname)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

#[tauri::command]
async fn read_json(pathname: &str) -> Result<serde_json::Value, MyError> {
    let mut file = File::open(pathname)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let json = serde_json::from_str(&contents)?;
    Ok(json)
}

#[tauri::command]
async fn save_file(pathname: &str, content: &str) -> Result<(), MyError> {
    let mut file = File::create(pathname)?;
    file.write_all(content.as_bytes())?;
    Ok(())
}

#[tauri::command]
async fn save_json(pathname: &str, content: serde_json::Value) -> Result<(), MyError> {
    let mut file = File::create(pathname)?;
    file.write_all(serde_json::to_string_pretty(&content)?.as_bytes())?;
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Enable shadow (and also round corners on Windows) on the main window
            let main_window = app.get_window("main").unwrap();
            set_shadow(&main_window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            read_file, read_json, save_file, save_json,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
