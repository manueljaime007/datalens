from sqlalchemy.orm import Session

from app.models.analysis import Analysis

class AnalysisService : 
    def __init__(self, db: Session):
        self.db = db
    
    def create_analysis(self, data):
        
        analisys = Analysis(
            name=data.name,
            description=data.description
        )

        self.db.add(analisys)
        self.db.commit()
        self.db.refresh(instance=analisys)
        
        return analisys
    