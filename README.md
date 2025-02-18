# SEO Player for Zvuk Business

## Overview
This project is a customizable audio player designed to be easily integrated into websites. The audio player operates from a separate domain, allowing for seamless integration using iframe technology.

## Features
The audio player comes with three variations:
- **Playlist**: A complete list of audio tracks that can be played in order.
- **Player Bar**: A widget that allows users to control playback without leaving the current page.
- **Embed Player**: A simple player that can be embedded directly into any webpage.

All variations function through iframe integration, ensuring flexibility and ease of use.

## Administration Panel
The project includes an administration panel that enables my colleagues to manage the audio player efficiently. Key features of the admin panel include:
- **Creating New Playlists**: Easily create and organize new playlists.
- **Editing Existing Playlists**: Modify existing playlists as needed.
- **Uploading Audio Files**: Upload audio files that might not be available in our primary database, ensuring that all desired tracks are accessible.

## Technical Details
This project is built using modern web technologies including:
- **Next.js**: For server-side rendering and fast performance.
- **React.js**: To create interactive user interfaces.
- **TypeScript**: For improved code quality and type safety.
- **SASS**: For enhanced styling capabilities.
<img src="{https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=whit}" />

## Database and Storage
The application utilizes a Redis database to efficiently store playlists. Additionally, cloud storage is implemented for scenarios requiring the upload of audio files for specific playlists, ensuring that users have a wide array of audio content at their disposal.
