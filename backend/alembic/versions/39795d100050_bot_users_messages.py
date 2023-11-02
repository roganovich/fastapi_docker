"""bot_users_messages

Revision ID: 39795d100050
Revises: 5f2b44fe991e
Create Date: 2023-10-22 20:22:43.192838

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '39795d100050'
down_revision: Union[str, None] = '5f2b44fe991e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('bot_users_messages',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('bot_user_id', sa.Integer(), nullable=True),
        sa.Column('scenario_id', sa.Integer(), nullable=True),
        sa.Column('text', sa.Text(), nullable=True),
        sa.Column('chain', sa.String(length=255), nullable=True),
        sa.Column('entities', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.current_timestamp()),
        sa.ForeignKeyConstraint(['bot_user_id'], ['bot_users.id']),
        sa.ForeignKeyConstraint(['scenario_id'], ['bot_messages_scenarios.id']),
        sa.PrimaryKeyConstraint('id')
    )
    pass


def downgrade() -> None:
    op.drop_table('bot_users_messages')
    pass
