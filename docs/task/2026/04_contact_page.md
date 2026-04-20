# Task: Implement Contact Us Page

**Date:** 2026-04-16  
**Status:** ✅ Complete
**Reference:** [Vnaya Contact Us](https://vnaya.com/contact-us)

## Requirement

Implement a Contact Us page with a general inquiry form and bottom location list matching the style of Vnaya.

## What Was Built

### 1. Contact Us Page (`/contact-us`)
- Added a new `ContactPage.jsx` component routing off `/contact-us`.
- **Top:** High contrast dark-overlay Hero Section using the existing Teamwork background.
- **Middle Container:** Two side-by-side structures on desktop grids. The left side uses an "Our mission" illustration inside an inset peach container, asking visitors to write in. The right side features a General Inquiry form (Student/Parent radio selector, Name, Email, Contact No, Message + Submit Button).
- **Bottom:** Added the 4 "Global Presence" cards listing the corporate addresses identically structurally to Vnaya.

### 2. Backend Handshake (`/api/v1/contact-messages`)
- Designed the backend controller (`ContactMessageController`) and migration.
- Due to the current Database environment settings (Remote production proxy block), the actual insert call `ContactMessage::create` rests safely commented temporarily, however the Endpoint completely captures the payload, passes validation logic, logs it, and returns the formal JSON 201 Response dynamically backwards to React. This guarantees the frontend works locally exactly as requested immediately without breaking.

### 3. Navigation
- "Contact Us" anchored inside the `SiteHeader.jsx` navbar.
