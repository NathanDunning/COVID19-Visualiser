# Assignment 2

Submission -
Team Code Due: 2359 Friday 2 October 2020
Individual Final Report Due: 2359 Monday 5 October 2020
Submission System: https://apps.ecs.vuw.ac.nz/submit/SWEN422

## 1. Introduction

Assignment 2 is worth 30% of the overall grade for the course, and will involve you implementing an information visualization software prototype application. The project will be completed as a small group of between two and four individuals. The grade is split into two main deliverables: an individual report on the design/implementation of the visualization and a critique of the tools used which is worth 75%; and a group component worth 25% assessed on the quality of the visualization and the code base. The total project should take around approximately 30 hours to complete per individual.

## 2. Goals

Your goal is to design and implement a software system for an information visualization application. The information visualization system should allow a user to interactively explore a dataset. The dataset needs to be based on Corona Virus (COVID-19) data.

The purpose of the interactive information visualization is to allow a user to identify trends and patterns in a variety of different aspects. A non-exhaustive list of possible aspects are (need to design and implement minimum 3 visualizations):

    total number of COVID-19 cases per country
    how has COVID-19 cases changed over time
    what country has performed the best and worst
    what geographical region has performed the best and worst
    compare and contrast countries based on different disease prevention strategies
    when has the second wave happened for countries
    visualize how contact tracing data from apps has been used
    ... 

## 3. Corona Virus (COVID-19)

In 2020 the world has been affected by a global pandemic called Corona Virus or more commonly known as COVID-19. This has affected all countries in a significant way. The World Health Organization has been collecting data about the virus so has each country. As at September 2020 there have been over 25 million cases, over 800K deaths, and 216 countries affected. https://www.who.int/emergencies/diseases/novel-coronavirus-2019

## 4. Data

There are many data sets you can use for this assignment depends on what visualizations you intend to develop. The World Health Organization (WHO) contains many data sets. Please make sure you attribute the dataset in your writeup. Here are some datasets feel free to explore more and let others know about them on the forum if you find some interesting ones:

    https://covid19.who.int/
    https://covid19.who.int/table
    https://www.who.int/emergencies/diseases/novel-coronavirus-2019
    https://ourworldindata.org/coronavirus-source-data
    https://ourworldindata.org/coronavirus-testing
    https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus
    https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases
    https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-resources-and-tools/nz-covid-tracer-app
    https://data.europa.eu/euodp/en/data/dataset/covid-19-coronavirus-data
    https://data.europa.eu/euodp/en/data/dataset/covid-19-coronavirus-data/resource/55e8f966-d5c8-438e-85bc-c7a5a26f4863
    https://data.humdata.org/dataset/novel-coronavirus-2019-ncov-cases
    https://www.kaggle.com/sudalairajkumar/novel-corona-virus-2019-dataset
    COVID Database: https://www.who.int/emergencies/diseases/novel-coronavirus-2019/global-research-on-novel-coronavirus-2019-ncov
    Search COVID database: https://search.bvsalud.org/global-literature-on-novel-coronavirus-2019-ncov/ 

## 5. Visualization System

The visualization system itself is indirectly assessed through the presentation and final report. The system must be submitted through the online submission system by 2359 Friday 2nd October. You are to use https://d3js.org/ (or appropriate JavaScript visualization library) to develop your visualization system, as this is a domain-specific tool that is widely used to generate visualization systems. D3 has good tutorials and documentation, and has built-in support for visualization techniques. You may use external libraries if the licensing permits this, however this is not required. Note however that you’ll be assessed on what you add to the design and implementation. Standard D3 has sufficient features and functionality to score highly on this project, with appropriate consideration for users and design.

Here are some example visualization systems and dashboards:

    WHO Coronavirus Disease (COVID-19) Dashboard - https://covid19.who.int/
    Johns Hopkins University COVID-19 Dashboard - https://coronavirus.jhu.edu/map.html
    Avi Schiffmann - https://ncov2019.live/
    Time - https://time.com/5800901/coronavirus-map/
    List of dashboards https://www.zdnet.com/article/how-to-track-the-coronavirus-dashboard-delivers-real-time-view-of-the-deadly-virus/
    The best, and the worst, of the coronavirus dashboards - https://www.technologyreview.com/2020/03/06/905436/best-worst-coronavirus-dashboards/
    ESRI - https://coronavirus-resources.esri.com/#get-data
    Tableau - https://www.tableau.com/covid-19-coronavirus-data-resources 

## 6. Teams

You need to work in a team to develop the visualization system. Teams between 2-4 members will be permitted. You can't do this assignment completely individually. Please use the ECS Team Sign up System.

Note: Teams need to be formed by Monday 14 September at the latest. Otherwise the lecturer will form teams for you.

## 7. Assignment Timeline

Here is a suggested timeline on how to complete this assignment successfully:

    Week 6: Attend lectures on introduction to InfoVis and InfoVis techniques. Read this assignment handout.
    Week 7: Form teams, gather data sets, experiment with D3. Come up with a plan on how to manage this assignment. Attend lectures on visual variables and information visualization design exercise.
    Week 8: Implement visualization 1. Download and install Latex templates for final individual report. Attend lectures on Gestures.
    Week 9: Implement visualization 2. Start writing final individual report. Attend lectures on AR/VR.
    Week 10: Implement visualization 3 Submit Assignment code and final report. 

## 8. Grade

There are two components to the grade. The group grade is worth 25% and the individual final report is worth 75%. Use the Submission System: https://apps.ecs.vuw.ac.nz/submit/SWEN422 for submitting the team code and individual final report.

### 8.1 Team Grade - Code (25%)

Your team (2-4 members) will be awarded an overall letter grade for the visualization system, in line with the grade descriptions stated in the Assessment Handbook (available via the University website). A marking rubric will be published in due course, and is based on both the quality of the visualization from the users’ perspective and also the quality of the visualization software from a software developers’ perspective. Need to design and implement a minimum of 3 visualizations. Students must inform the lecturer via the team sign up sheet (2-4 members) by 2359 on Monday 14 September at the latest.

Team Code Due: 2359 Friday 2 October 2020

### 8.2 Individual Grade - Final Report (75%)

You will need to submit a final report — individually undertaken — identifying the key design/implementation decisions along with justifications of these decisions, and a critique of the development tools used.

In your discussion of the key design decisions (e.g. visual variables), their justifications (and whether they were ultimately successful) you are encouraged to discuss alternative designs you could have followed. Note that it is valid to have made a decision at one point with what was at the time appropriate justification, only to discover it did not work out. This is reasonable to discuss in this report, and as long as you can justify the initial decision, you will also receive credit for consideration of why it ultimately failed. Critique the design of your visualizations (e.g. visual variables), development tools that your team used such as D3, and any additional framework / editor / development system that you also chose to use. The report should be a *maximum of four pages* including everything. Additionally add your name and student ID on the first page.

As with ENGR401, the default IEEE Transactions Journal format (use Transactions on Visualization and Computer Graphics format) must be used for this assignment. You may find LaTeX or Microsoft Word article templates on the IEEE website. Those using ECS systems should find that most LaTeX distributions include the IEEEtran class.

Individual Final Report Due: 2359 Monday 5 October 2020

## 9. Submission

It is important to follow these submission guidelines. Failure to do so may require re-submission, and the application of penalties if re-submission occurs after the official deadline. Please note that extensions can only be given for medical emergencies, and that some form of evidence is normally required. Extensions must be arranged before the relevant deadline. In accordance with the course outline, assessment that is submitted late will incur a one grade point penalty on the assessment item for each day that the assessment is late. There are two separate submission deadlines for this project:

    One member of your group needs to submit your visualization system and materials (code and documentation) by 2359 on Friday 2nd October 2020.
    Each member of the your group needs to submit am individual final report by 2359 on Monday 5th October 2020. 

Please Note:

    All submissions should be via the online submission system:
    All reports should be submitted as PDF files, with the filename SWEN422-Assignment-2-username.pdf.
    All visualization tools should be submitted as either tar-balls or zip files, with the filename SWEN422-Assignment-2-Code-groupID.pdf. 

## 10. Questions

We strongly encourage you to direct all general questions to the class forum. Similarly, you should monitor the class forum for answers, as any clarifications will apply to all groups irrespective of whether you chose to read it or not. Or contact the course lecturer: Craig Anslow. 
