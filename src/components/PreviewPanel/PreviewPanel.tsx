import './PreviewPanel.css';

const PreviewPanel = () => {
  return (
    <section className="preview-panel">
      <div className="preview-panel-title">
        <h3 className="preview-panel-title-text">Live preview</h3>
        <span className="preview-panel-title-live" />
      </div>
      <div className="preview-panel-content">
        <p>
          This is where the live preview of the form will be displayed. As you
          add fields in the editor panel, they will appear here in real-time.
        </p>
      </div>
    </section>
  );
};

export default PreviewPanel;
