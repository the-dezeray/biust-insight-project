import os
import pickle
import google.auth
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# If modifying these SCOPES, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

def authenticate_google_drive():
    """Authenticates the user and returns the Google Drive service."""
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    
    service = build('drive', 'v3', credentials=creds)
    return service

def create_local_structure(service, folder_id, path, depth=0):
    """Creates local folders and Markdown files based on Google Drive structure."""
    results = service.files().list(
        q=f"'{folder_id}' in parents and trashed = false",
        fields="nextPageToken, files(id, name, mimeType)").execute()
    items = results.get('files', [])
    
    if not items:
        print('No files found.')
        return
    
    for item in items:
        if item['mimeType'] == 'application/vnd.google-apps.folder':
            folder_name = item['name']
            folder_path = os.path.join(path, folder_name)
            
            if depth == 0:
                # Create local folder for first-level subdirectory
                os.makedirs(folder_path, exist_ok=True)
                print(f"Created folder: {folder_path}")
            elif depth == 1:
                # Create Markdown file for second-level subdirectory
                md_file_path = os.path.join(path, f"{folder_name}.md")
                with open(md_file_path, 'w') as md_file:
                    md_file.write(f"# {folder_name}\n\n")
                    print(f"Created Markdown file: {md_file_path}")
                
                # List contents in the Markdown file
                sub_items = service.files().list(
                    q=f"'{item['id']}' in parents and trashed = false",
                    fields="files(name, mimeType)").execute().get('files', [])
                
                with open(md_file_path, 'a') as md_file:
                    for sub_item in sub_items:
                        item_type = "Folder" if sub_item['mimeType'] == 'application/vnd.google-apps.folder' else "File"
                        md_file.write(f"- {item_type}: {sub_item['name']}\n")
            
            # Recursively process subfolders
            create_local_structure(service, item['id'], folder_path, depth + 1)
        elif depth == 0:
            print(f"File in root: {item['name']}")

def main():
    service = authenticate_google_drive()
    
    # Replace with your folder ID
    parent_folder_id = '1kiJkovxuZHspk6Cvf_OCuWRVGs_ijZUJ'
    
    # Create a base folder for our local structure
    base_folder = 'GoogleDriveSync'
    os.makedirs(base_folder, exist_ok=True)
    
    print("Creating local folder structure and Markdown files:")
    create_local_structure(service, parent_folder_id, base_folder)

if __name__ == '__main__':
    main()