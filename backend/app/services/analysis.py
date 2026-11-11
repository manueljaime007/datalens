from sqlalchemy.orm import Session

from app.models.analysis import Analysis

class AnalysisService : 
    def __init__(self, db: Session):
        self.db = db
    
    def create_analysis(self, filename: str, data: dict):
        analysis = Analysis(
            filename = filename,
            **data
        )
        self.db.add(analysis)
        self.db.commit()
        self.db.refresh(analysis)
        
        return analysis
        
    def get_analyses(self):
        return (
            self.db.query(Analysis)
            .order_by(Analysis.created_at.desc())
            .all()
        )
        
    def get_analysis_by_id(self, id: int):
        return self.db.get(Analysis, id)
    
    def delete_analysis_by_id(self, id: int):
        analysis = self.db.get(Analysis, id)
        
        if analysis is None: 
            return False

        self.db.delete(analysis)
        self.db.commit()
        
        return True
