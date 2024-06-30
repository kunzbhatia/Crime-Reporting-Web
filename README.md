# Crime-Reporting-Web
# SecureSpot: A Community-Based Crime Reporting and Awareness Platform

## Table of Contents
1. [Intended Audience and Document Overview](#intended-audience-and-document-overview)
2. [Definitions, Acronyms, and Abbreviations](#definitions-acronyms-and-abbreviations)
3. [References and Acknowledgments](#references-and-acknowledgments)
4. [Overall Description](#overall-description)
   - [Product Perspective](#product-perspective)
   - [Product Functionality](#product-functionality)
   - [Users and Characteristics](#users-and-characteristics)
   - [Operating Environment](#operating-environment)
   - [Design and Implementation Constraints](#design-and-implementation-constraints)
   - [User Documentation](#user-documentation)
   - [Assumptions and Dependencies](#assumptions-and-dependencies)
5. [Specific Requirements](#specific-requirements)
   - [External Interface Requirements](#external-interface-requirements)
     - [User Interfaces](#user-interfaces)
     - [Hardware Interfaces](#hardware-interfaces)
     - [Software Interfaces](#software-interfaces)
     - [Communications Interfaces](#communications-interfaces)
   - [Functional Requirements](#functional-requirements)
   - [Behaviour Requirements](#behaviour-requirements)

## Intended Audience and Document Overview

The document is geared toward a variety of readers, each of whom has a unique role and set of interests:
- **Developers**: Interested in technical specifics, system design, and implementation facets of the "SecureSpot" project.
- **Users**: Seek to understand how to use the website effectively, including reporting crimes, subscribing to updates, and engaging in discussions.
- **Professors**: In an academic context, interested in the project's objectives, methodologies, and the demonstration of theoretical and practical knowledge.

This document contains the functional and non-functional requirements of the system and the Data Flow Diagram (DFD) of the system.

## Definitions, Acronyms, and Abbreviations

- **WA**: Web Application
- **IEEE**: Institute of Electrical and Electronics Engineers
- **API**: Application Programming Interface
- **GUI**: Graphical User Interface
- **HTTP**: Hypertext Transfer Protocol
- **HTTPS**: Hypertext Transfer Protocol Secure
- **JSON**: JavaScript Object Notation
- **SRS**: Software Requirements Specification
- **UI**: User Interface
- **URL**: Uniform Resource Locator
- **UX**: User Experience

## References and Acknowledgments

This SRS document refers to the following documents and resources:
- O'Hara, J.M. and Fleger, S., 2020. Human-system interface design review guidelines.
- Hazra, D. and Aranzazu, J., 2022. Crime, correction, education and welfare in the US–What role does the government play?
- Mamak, K., 2022. Categories of fake news from the perspective of social harmfulness.

## Overall Description

### Product Perspective
"SecureSpot" is a standalone product that serves as a comprehensive solution for community-based crime reporting and awareness. It is not part of an existing product family, nor does it replace any existing systems.

### Product Functionality
"SecureSpot" offers a range of key functionalities to empower users and enhance community safety:
- Crime Reporting
- Subscription Feature
- Community Insights
- User Profiles
- Notification System
- Search and Filtering
- Mobile Accessibility
- Privacy Measures
- Crime Analysis

### Users and Characteristics
The primary user categories include:
- Regular Users
- Documentation Writers
- Researchers
- Law Enforcement Agencies

### Operating Environment
Platform minimum requirements:
- **Hardware**: Internet-connected desktop or laptop computers, tablets, smartphones.
- **Operating system**: Compatible with popular desktop and mobile operating systems like Windows, macOS, Linux, iOS, and Android.
- **Web browsers**: Current web browsers like Microsoft Edge, Apple Safari, Mozilla Firefox, Google Chrome.
- **Internet connection**: Reliable internet connection.

### Design and Implementation Constraints
- Cross-Browser Compatibility
- Data Security
- Scalability
- Programming Languages and Frameworks
- Mobile Responsiveness
- Third-Party Services
- Maintainability

### User Documentation
- Comprehensive user guides
- Real-time, context-sensitive help system
- Interactive tutorials and step-by-step instructions
- FAQs
- Video guides

### Assumptions and Dependencies
- Integrations with Third Parties
- User Accessibility
- Legal and Regulatory Compliance
- Data Sources
- External Libraries and Frameworks
- Internet Connectivity

## Specific Requirements

### External Interface Requirements

#### User Interfaces
- User Home Page
- Dark & Light Mode
- Crime Reporting Page
- Crime Search and Filtering
- Crime Details Page
- User Profile Management
- Discussion Forums
- Notifications Center
- Analysis Dashboard
- Help and Support
- Navigation Menu
- Logout

#### Hardware Interfaces
- **Devices Supported**: PCs, laptops, tablets, smartphones.
- **Web-based Interaction**: Users interface with the platform through web browsers.
- **Server Management**: Hosted in a data center or cloud architecture.
- **External Statistics Sources**: Integration with external databases or APIs.
- **External Notification Systems**: Used for real-time warnings and updates.

#### Software Interfaces
- Runs under Linux or Windows operating systems.
- Uses Node.js, Express.js, MongoDB, React, and npm packages.
- Data transport and interactions via HTTP-based APIs.
- Cross-Platform Compatibility.

#### Communications Interfaces
- Uses HTTP/HTTPS for client-server communication.
- SMTP for email notifications.
- Multer for secure file uploads.
- RESTful APIs using JSON for integration with external applications.

### Functional Requirements

#### Managing User Accounts
- User Registration
- User Login
- Password Reset
- Update Profile
- Account Deactivation

#### Reporting of Crime
- Incident Submission
- Image Upload
- Edit and Delete Reports
- View and Comment on Reports

#### Crime Analysis
- Crime Statistics
- Filter and Search

#### Notifications and Alerts
- Real-time Alerts
- Email Notifications
- Notification Settings

### Behaviour Requirements

#### Use Case View
- **Register User (Actor: Guest)**
- **Login (Actor: User)**
- **Reset Password (Actor: User)**
- **Subscribe to Crime Updates (Actor: User)**
- **View Crime Statistics (Actor: User)**
- **Administer Platform (Actor: Administrator)**
- **Deactivate Account (Actor: User)**
- **Comment on Incident (Actor: User)**

## Contributing
Please read the [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- All contributors and supporters
- Inspiration and resources used for the project

---

Feel free to add any additional sections or modify this template to better fit the specifics of your project.
based on this make a system archetecute for this MERN website in detail
no cloud was used, it was a mongodb, express, react and nodejs tech stack in model view architecture , it is deploy on vercel
