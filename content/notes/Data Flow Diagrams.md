---
date:
  "{ date }":
course: "[[LIS 161]]"
domain: "[[Analysis Phase]]"
tags:
  - publish
---

#publish
# Data Flow Diagrams
----
→ a technique for diagramming business processes and the data that passes among them
→ to describe the to-be system’s interactions with its environment, processes, data flows, and data stores
→ how data moves and transforms in the system

## a. reading dfd
→ the goal is to understand what processes exist, what data moves between them, where data is stored, and who interacts with the system
→ read from left to right and top to bottom
→ however, still note that dfds are read logically rather than in a fixed execution sequence

## b. elements of dfds
### 1. process
→ the activity or function performed for a specific reason
→ naming: using a short verb-noun format (e.g., verify order, retrieve order details)
→ has a number and at least one output and at least one input
→ generally performs a single activity
→ clear and precise steps of the processes 
![[Pasted image 20260309233823.png]]
### 2. data flow
-> represents data moving between processes, entities, and data scores
→ naming: noun
→ one or more connection to a process
→ can be a single data element or a logical group of elements
→ what data element/s the flow contains
![[Pasted image 20260309234151.png]]
### 3. data store
→ collection of related data that is stored in some way for later use by the system
→ naming: noun and an assigned identification number
→ one output and one input
→ logical connection between the process model and the data model
→ lists the data elements contained in the data store and explains how the data is used by the system
![[Pasted image 20260309234203.png]]
### 4. external entity
→ person, org, or system that is external to the system but interacts with it
→ primary actor identified in the use case
→ provides data, receives data, or both in the system
![[Pasted image 20260309234346.png]]
### sense-making
![[a_Pasted image 20260309234419|700x400]]

## c. using dfd to define business processes
→ diff levels of dfds are used to represent processes with increasing detail, called decomposition
→ complex process are decomposed [^1]
→ each level adds detail
### 1. context diagram
→ top-level dfd in every business process model
→ shows the entire business process as a single process
→ identifies the external entities and major data flows
→ data stores are not included in context diagrams
→ its purpose is to understand how the system interacts with its 
![[Data Flow Diagrams260310.excalidraw|700x150]]

### level 0 diagram
→ expands the singular process in the context diagram into major processes at the first level of numbering
→ shows the data stores, external entities, and data flows among the major processes
balancing[^2] principle ensures that information shown at one dfd level is accurately represented at the next level
![[Data Flow Diagrams260310_0.excalidraw|800x150]]
#### balancing rule
→ if a process in lvl 0 receives and outputs certain data, lvl 1 decomposition must show the SAME inputs and outputs
![[a_Pasted image 20260310022836|800x300]]
### level 1 diagram
→ decomposes each lvl 0 process into a more detailed program at the second level of numbering
shows how a single parent process operates internally
→ each lvl 0 has its own lvl 1, which is the children of the parent lvl 0 process
→ maintains balance with the lvl 0 dfd by preserving all external entities and data flows
→ its purpose is to understand a specific process in greater depth
![[Data Flow Diagrams260310_1.excalidraw|400x250]]
### level 2 diagram
→ used when lvl 1 is still too complex or has many inputs and outputs
![[Data Flow Diagrams260310_2.excalidraw]]
### alternative data flows
→represents diff paths that data can take
→ occur due to errors, exceptions, or special conditions
→ purpose is t o ensure that the system can handle both normal and exceptional situations

## d. process descriptions
→ explain what the process does and provide additional information that the dfd does not provide

| common types       | definition                                                              |
| ------------------ | ----------------------------------------------------------------------- |
| structured english | short sentences that describe the work a process performs               |
| decision trees     | displays decision logic as nodes and branches                           |
| decision tables    | shows all possible combinations of conditions and corresponding actions |

## vi. creating data flow diagrams
### dfd fragment
→ a portion of a dfd that represents a single use case and will later be combined with other fragments to form a complete dfd

### dfd numbering
#### context diagram
→ whole system is one process
→ 0 or unnumbered
#### lvl 0
→ 1, 2, 3
→ 0 is from context diagram
#### lvl 1
→ 2.1, 2.2, 2.3
#### lvl 2
→ 2.2.1, 2.2.2, 2.2.3

[^1]: break into smaller pieces

[^2]: ensures that data flows remain consistent between diagram levels; child diagrams must match parent input and outputs
