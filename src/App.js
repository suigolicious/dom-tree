import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const mockResponse = {
    html: {
      head: {
        meta: '',
        title: 'DOM Tree as a File System'
      },
      body: {
        h1: 'An Example Site',
        h3: 'To Demonstrate what some nested nodes might look like ',
        ul: {
          li: ['One', 'Two', 'Three']
        },
        p: ['Some Text', 'More Text']
      }
    }
  };

  function loopThroughLeafs(leafs) {
    let myLeafs = [];
    for (let i = 0; i < leafs.length; i++) {
      myLeafs.push(<div className='leaf-document'><span className="bi bi-file-earmark-text-fill file-icon"></span><li>{leafs[i]}</li></div>);
    }
    return myLeafs;
  }

  const createTree = (branch) => {
    if (typeof branch === 'object' && !Array.isArray(branch) && branch !== null) {
      let branches = [];
      for (let i = 0; i < Object.keys(branch).length; i++) {
        branches.push(<ul className={Object.keys(branch)[i] === "head" || Object.keys(branch)[i] === "body" ? Object.keys(branch)[i] + "-node" : "nested"}>
            <li className='folder'>
              <span className='plus-and-folder-icon'>
                <span className='plus-square bi bi-plus-square'/>
                <span className='folder-icon bi bi-folder'/>
              </span>
              <div className='folder-branch'>{Object.keys(branch)[i]}{createTree(branch[Object.keys(branch)[i]])}</div>
            </li>
          </ul>);
      }
      return branches;
    } else {
      if (Array.isArray(branch)) {
        return (
          <ul className="nested">
            {loopThroughLeafs(branch)}
          </ul>
        );
      } else {
        return <ul className="nested">{branch && <div className='leaf-document'><span className="bi bi-file-earmark-text-fill file-icon"></span><li>{branch}</li></div>}</ul>
      }
    }
  }

  useEffect(() => {
    const documents = document.getElementsByClassName('leaf-document');
    for (let i = 0; i < documents.length; i++) {
      documents[i].addEventListener('click', function(event) {
        setDocumentName(event.currentTarget.textContent);
      });
    }
    const folders = document.getElementsByClassName('plus-square');
    for (let i = 0; i < folders.length; i++) {
      folders[i].addEventListener('click', function(event) {
        let childrenElements = event.currentTarget.parentElement.parentElement.getElementsByClassName("nested");
        for(let i = 0; i < childrenElements.length; i++) {
          if (childrenElements[i].parentElement.parentElement === event.currentTarget.parentElement.parentElement) {
            childrenElements[i].classList.toggle('active');
          }
        }

        if (event.currentTarget.classList.contains('bi-plus-square')) {
          event.currentTarget.classList.remove('bi-plus-square');
          event.currentTarget.classList.add('bi-file-minus');
        } else {
          event.currentTarget.classList.remove('bi-file-minus');
          event.currentTarget.classList.add('bi-plus-square');
        }
      })
    }
  }, []);

  const [documentName, setDocumentName] = useState('Label');
  
  return (
    <div className="App">
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className='title-section'>
            <h3 className='title'>Title</h3>
            <span className='close-button bi bi-x'></span>
          </div>
          <div className='document-name-section'>
            <p className='document-name'>{documentName}</p>
          </div>
          <div className='file-tree'>
            {createTree(mockResponse.html)}
          </div>
          <div className="footer">
            <div className='link'>Link</div>
            <div className='done-button'>
              <div>Done</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
