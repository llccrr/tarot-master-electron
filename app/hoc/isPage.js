import React from 'react';

export const isPage = WrappedComponent => props => (
    <div style={styles.container}>
        <WrappedComponent {...props} />
    </div>
);

const styles = {
    container: { padding: '2% 10%', width: '100%' }
};
