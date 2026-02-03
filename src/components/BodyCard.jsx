export const BodyCard = ({Top,Bottom}) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', height: '100%' ,backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '1em' }}>
            <div style={{height: '30%', borderRadius: '1em'}}> 
            <Top />
            </div>
            <div style={{height: '70%', borderRadius: '1em'}}> 
            <Bottom />
            </div>
          {/* <Top />
          <Bottom /> */}

          </div>
);